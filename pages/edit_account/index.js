import { useState } from "react";
import { getSession } from "next-auth/client";
import Link from "next/link";
import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  InputLeftAddon,
  InputGroup,
  Button,
  ButtonGroup,
  HStack,
  VStack,
  Center,
} from "@chakra-ui/react";
import dbConnect from "../../lib/mongodb";
import rightArrow from "../../assets/svgIcons/rightArrow.svg";
import User from "../../models/User";
import axios from "axios";
import QRCode from "qrcode";
import QrCodeViewer from "../../components/QrCode/QrCodeViewer";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import SaveButton from "../../components/Buttons/SaveButton";

function EditProfile({ data }) {
  const [newProfileName, setNewProfileName] = useState(data.profileName);
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmitProfileName = async () => {
    const response = await axios.put(`/api/users/${data._id}`, {
      profileName: newProfileName,
    });
    alert("Nombre de Perfil Actualizado");
  };

  const generateQr = async () => {
    const baseUrl = window.location.origin;
    const userProfileQrLink = `${baseUrl}/${data.profileName}`;
    try {
      const qrSource = await QRCode.toDataURL(userProfileQrLink);
      setImageUrl(qrSource);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveQrCode = () => {
    QRCode.toFile(
      `${data.profileName}`
      // {
      //   type: "png",
      //   color: {
      //     dark: "#333", // Blue dots
      //     light: "#0000", // Transparent background
      //   },
      // },
      // function (err) {
      //   if (err) throw err;
      //   console.log("done");
      // }
    );
  };

  return (
    <div
      className='container mx-auto w-5/6 md:w-1/2 flex flex-col items-center 
    justify-center space-y-10'>
      {!imageUrl ? (
        <>
          <h1 className='text-3xl sm:text-5xl font-hindi font-bold sm:mt-5'>
            Edita tu Cuenta
          </h1>
          <FormControl id='profileName' mb={20}>
            <FormLabel>Nombre de Perfil</FormLabel>
            <div className='flex flex-col md:flex-row space-y-3 md:space-x-3 items-baseline'>
              <InputGroup size='lg'>
                <InputLeftAddon>/</InputLeftAddon>
                <Input
                  variant='filled'
                  size='lg'
                  type='text'
                  value={newProfileName}
                  placeholder={data.profileName}
                  backgroundColor='#FFF'
                  onChange={(e) => setNewProfileName(e.target.value)}
                />
              </InputGroup>
              <SaveButton
                onClick={handleSubmitProfileName}
                bgColor='bg-primary-mpago700'
                title='Guardar'
                icon={rightArrow}
                width='sm:w-2/4 w-full'
              />
            </div>
            <FormHelperText>
              Podes cambiar tu Nombre de Perfil siempre y cuando no esté en uso
            </FormHelperText>
          </FormControl>
          <div className='flex flex-col justify-center items-center md:justify-start space-y-5 w-full'>
            <Link
              href={`https://auth.mercadopago.com.ar/authorization?client_id=6610547979814243&response_type=code&platform_id=mp&state=${data._id}&redirect_uri=http://localhost:3000/api/mercadopago/callback`}
              passHref>
              <Button
                rightIcon={<ArrowForwardIcon />}
                colorScheme='telegram'
                size='lg'
                width={300}
                variant='solid'>
                Enlaza tu cuenta de MP
              </Button>
            </Link>
            <Button
              rightIcon={<ArrowForwardIcon />}
              colorScheme='messenger'
              size='lg'
              width={300}
              variant='solid'
              onClick={generateQr}>
              Generar mi código QR
            </Button>
          </div>
        </>
      ) : (
        <QrCodeViewer
          handleSaveQrCode={handleSaveQrCode}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
        />
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const connected = await dbConnect();
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  } else {
    const singleUser = await User.findOne({ _id: session.user.id });
    const user = JSON.parse(JSON.stringify(singleUser));
    if (!singleUser?.profileName) {
      return {
        redirect: {
          destination: "/setup_account",
          permanent: false,
        },
      };
    } else {
      return {
        props: {
          data: user,
        },
      };
    }
  }
}

export default EditProfile;
