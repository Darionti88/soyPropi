import { useEffect, useRef, useState } from "react";
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
  FormErrorMessage,
} from "@chakra-ui/react";
import rightArrow from "../../assets/svgIcons/rightArrow.svg";
import { User } from "@prisma/client";
import prisma from "../../lib/prisma";
import axios from "axios";
import QRCode from "qrcode";
import QrCodeViewer from "../../components/QrCode/QrCodeViewer";
import { ArrowForwardIcon, DeleteIcon } from "@chakra-ui/icons";
import SaveButton from "../../components/Buttons/SaveButton";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { FullUser, SessionUser } from "../../types/types";
import { CLIENT_ID, DEV_URL } from "../../mocks/constants";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { Formik } from "formik";
import AlertError from "../../components/Alert/AlertDialog";

function EditProfile({ user }: { user: FullUser }) {
  const [newProfileName, setNewProfileName] = useState(user.profileName);
  const [imageUrl, setImageUrl] = useState<string>();
  const [remove, setRemove] = useState<boolean>();
  const [message, setMessage] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");

  const cancelRef = useRef();

  const router = useRouter();

  const onClose = () => {
    setIsOpen(false);
  };

  const profileSchema = Yup.object().shape({
    profileName: Yup.string()
      .min(4, "Muy corto! Mínimo 4 letras.")
      .matches(/^\S*$/, "No puede tener espacios entre las palabras")
      .max(20, "Too Long!")
      .required("Required"),
  });

  useEffect(() => {
    setStatus("");
    user.mercadopago?.user_id ? setRemove(true) : setRemove(false);
  }, [remove, user.mercadopago?.user_id, newProfileName]);

  const deleteMpAccount = async () => {
    await axios.delete(`/api/mercadopago/${user.id}`);
    router.replace(router.asPath);
  };

  const generateQr = async () => {
    const userProfileQrLink = `${DEV_URL}/${newProfileName}`;
    try {
      const qrSource = await QRCode.toDataURL(userProfileQrLink);
      setImageUrl(qrSource);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className='container mx-auto w-5/6 md:w-2/3 flex flex-1   flex-col items-center 
    justify-center space-y-10'>
      {!imageUrl ? (
        <>
          <h1 className='text-3xl sm:text-5xl font-hindi font-bold sm:mt-5'>
            Edita tu Cuenta
          </h1>
          <Formik
            initialValues={{ profileName: user.profileName }}
            validationSchema={profileSchema}
            onSubmit={async (values) => {
              try {
                await axios.put(`/api/users/${user.id}`, values);
                setNewProfileName(values.profileName);
                setIsOpen(true),
                  setMessage("Tu nombre se actualizó correctamente! 😃");
              } catch (error) {
                setStatus("error"),
                  setMessage(error.response.data.message),
                  setIsOpen(true);
              }
            }}>
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <form className='md:w-4/6'>
                <FormControl
                  id='profileName'
                  mb={20}
                  isInvalid={Boolean(
                    touched.profileName && errors.profileName
                  )}>
                  <FormLabel>Nombre de Perfil</FormLabel>
                  <div className='flex flex-col md:flex-row space-y-3 md:space-x-3 items-baseline'>
                    <InputGroup size='lg'>
                      <InputLeftAddon>/</InputLeftAddon>
                      <Input
                        variant='filled'
                        size='lg'
                        type='text'
                        value={values.profileName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        backgroundColor='#FFF'
                      />
                    </InputGroup>
                    <SaveButton
                      onClick={handleSubmit}
                      bgColor='bg-primary-mpago700'
                      title='Guardar'
                      icon={rightArrow}
                      width='sm:w-2/4 w-full'
                    />
                  </div>
                  <FormHelperText>
                    Podes cambiar tu Nombre de Perfil siempre y cuando no esté
                    en uso
                  </FormHelperText>
                  <FormErrorMessage>{errors.profileName}</FormErrorMessage>
                </FormControl>
              </form>
            )}
          </Formik>
          <div className='flex flex-col justify-center items-center md:justify-start space-y-5 w-full'>
            {!remove && (
              <Link
                href={`https://auth.mercadopago.com.ar/authorization?client_id=${CLIENT_ID}&response_type=code&platform_id=mp&state=${user.id}&redirect_uri=${DEV_URL}/api/mercadopago/callback`}
                passHref>
                <Button
                  rightIcon={<ArrowForwardIcon />}
                  colorScheme='telegram'
                  disabled={Boolean(user.mercadopago?.user_id)}
                  size='lg'
                  width={300}
                  variant='solid'>
                  Enlaza tu cuenta de MP
                </Button>
              </Link>
            )}
            {remove && (
              <Button
                rightIcon={<DeleteIcon />}
                colorScheme='red'
                size='lg'
                width={300}
                variant='solid'
                onClick={deleteMpAccount}>
                Quitar cuenta MercadoPago
              </Button>
            )}
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
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          profileName={newProfileName}
        />
      )}
      <AlertError
        onClose={onClose}
        status={status}
        isOpen={isOpen}
        errorMessage={message}
        cancelRef={cancelRef}
      />{" "}
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
