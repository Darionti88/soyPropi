import React, { useRef, useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Text,
} from "@chakra-ui/react";
import { getSession } from "next-auth/react";
import { Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useRouter } from "next/router";
import rightArrow from "../../assets/svgIcons/rightArrow.svg";
import SaveButton from "../../components/Buttons/SaveButton";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { SessionUser } from "../../types/types";
import { User } from "@prisma/client";
import AlertError from "../../components/Alert/AlertDialog";

const CreateProfileName = ({ user }: { user: User }) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const cancelRef = useRef();

  const onClose = () => {
    setError(false);
  };

  const profileSchema = Yup.object().shape({
    profileName: Yup.string()
      .min(4, "Muy corto! Mínimo 4 letras.")
      .matches(/^\S*$/, "No puede tener espacios entre las palabras")
      .max(20, "Too Long!")
      .required("Required"),
  });

  return (
    <div
      className='container mx-auto w-5/6 md:w-1/2 flex flex-col items-center 
    justify-center space-y-10'>
      <h1 className='text-3xl sm:text-5xl font-hindi font-bold sm:mt-5'>
        Elegí tu nombre de Usuario
      </h1>
      <Formik
        initialValues={{ profileName: "", accountType: "individual" }}
        validationSchema={profileSchema}
        onSubmit={async (values, { resetForm }) => {
          if (values.profileName.length < 3) alert("Nombre muy corto");
          try {
            await axios.put(`/api/users/${user.id}`, {
              ...values,
              accountType: "individual",
            });
            resetForm();
            setMessage("");
            router.push(`/edit_account`);
          } catch (error) {
            setError(true), setMessage(error.response.data.message);
          }
        }}>
        {({
          values,
          errors,
          touched,
          isValid,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form
            onSubmit={handleSubmit}
            className='flex flex-col space-y-7 items-center justify-center'>
            <FormControl
              id='profileName'
              isRequired
              isInvalid={Boolean(touched.profileName && errors.profileName)}>
              <FormLabel>
                Hola {user.name} Elegí el nombre de tu perfil
              </FormLabel>
              <input
                className='bg-white w-full h-10 rounded-md px-3 border-2 border-grey-100'
                placeholder='Ej: baloDelMattone'
                name='profileName'
                value={values.profileName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormHelperText>
                Este va a ser el nombre por el que los demás te podrán encontrar
              </FormHelperText>
              <FormErrorMessage>{errors.profileName}</FormErrorMessage>
            </FormControl>
            <SaveButton
              icon={rightArrow}
              title='Guardar'
              bgColor='bg-primary-mpago700'
              type='submit'
            />
          </form>
        )}
      </Formik>
      <AlertError
        onClose={onClose}
        error={error}
        errorMessage={message}
        cancelRef={cancelRef}
      />{" "}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);
  const user = session.user;
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      user,
    },
  };
};

export default CreateProfileName;
