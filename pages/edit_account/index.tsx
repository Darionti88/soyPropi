import { useState } from "react";
import { getSession } from "next-auth/react";
import Link from "next/link";
import {
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  InputLeftAddon,
  InputGroup,
  Button,
} from "@chakra-ui/react";

import rightArrow from "../../assets/svgIcons/rightArrow.svg";
// import User from "../../models/User";
import { User } from "@prisma/client";
import prisma from "../../lib/prisma";
import axios from "axios";
import QRCode from "qrcode";
import QrCodeViewer from "../../components/QrCode/QrCodeViewer";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import SaveButton from "../../components/Buttons/SaveButton";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { SessionUser } from "../../types/types";

function EditProfile({ user }: { user: User }) {
  const [newProfileName, setNewProfileName] = useState(user.profileName);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleSubmitProfileName = async () => {
    const response = await axios.put(`/api/users/${user.id}`, {
      profileName: newProfileName,
    });
    alert("Nombre de Perfil Actualizado");
  };

  const generateQr = async () => {
    const baseUrl = window.location.origin;
    const userProfileQrLink = `${baseUrl}/${newProfileName}`;
    try {
      const qrSource = await QRCode.toDataURL(userProfileQrLink);
      setImageUrl(qrSource);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className='container mx-auto w-5/6 md:w-2/3 flex flex-col items-center 
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
                  placeholder={user.profileName}
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
              href={`https://auth.mercadopago.com.ar/authorization?client_id=6610547979814243&response_type=code&platform_id=mp&state=${user.id}&redirect_uri=http://localhost:3000/api/mercadopago/callback`}
              passHref>
              <Button
                rightIcon={<ArrowForwardIcon />}
                colorScheme='telegram'
                size='lg'
                width={300}
                variant='solid'>
                {user.mercadopago?.user_id
                  ? "Cuenta ya enlazada"
                  : "Enlaza tu cuenta de MP"}
              </Button>
            </Link>
            <Button
              rightIcon={<ArrowForwardIcon />}
              colorScheme='messenger'
              size='lg'
              width={300}
              variant='solid'
              onClick={user.mercadopago?.user_id ? null : generateQr}>
              Generar mi código QR
            </Button>
          </div>
        </>
      ) : (
        <QrCodeViewer
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          profileName={newProfileName}
        />
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  } else {
    const currentUser: SessionUser = session.user;
    const singleUser: User = await prisma.user.findUnique({
      where: { id: currentUser.id },
      include: { mercadopago: true },
    });
    const user: User = JSON.parse(JSON.stringify(singleUser));
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
          user,
        },
      };
    }
  }
};

export default EditProfile;
