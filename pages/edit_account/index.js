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
import {
  ArrowForwardIcon,
  ArrowBackIcon,
  DownloadIcon,
} from "@chakra-ui/icons";
import dbConnect from "../../lib/mongodb";
import User from "../../models/User";
import axios from "axios";
import QRCode from "qrcode";
import QRcodeImage from "../../components/QRcode";

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
    <div className='container mx-auto p-10 h-screen items-center justify-center flex-col'>
      {!imageUrl ? (
        <>
          <h1 className='text-4xl mb-10'>
            Hola {data.name}. Acá podes editar tu perfil
          </h1>
          <FormControl id='profileName' mb={20}>
            <FormLabel>Nombre de Perfil</FormLabel>
            <HStack>
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
              <Button
                onClick={handleSubmitProfileName}
                rightIcon={<ArrowForwardIcon />}
                colorScheme='teal'
                size='lg'
                variant='solid'>
                Guardar
              </Button>
            </HStack>

            <FormHelperText>
              Podes cambiar tu Nombre de Perfil siempre y cuando no esté en uso
            </FormHelperText>
          </FormControl>
          <ButtonGroup>
            <VStack>
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
            </VStack>
          </ButtonGroup>
        </>
      ) : (
        <Center w='full'>
          <VStack>
            <HStack
              alignItems='center'
              justifyContent='center'
              w='80%'
              spacing='10'
              mb='5%'>
              <Button
                leftIcon={<ArrowBackIcon />}
                colorScheme='messenger'
                size='lg'
                width={300}
                variant='solid'
                onClick={() => setImageUrl("")}>
                Volver
              </Button>
              <Button
                leftIcon={<DownloadIcon />}
                colorScheme='messenger'
                size='lg'
                width={300}
                variant='solid'
                onClick={handleSaveQrCode}>
                Guardar
              </Button>
            </HStack>
            <QRcodeImage imageUrl={imageUrl} />
          </VStack>
        </Center>
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
