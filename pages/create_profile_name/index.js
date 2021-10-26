import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";
import { getSession } from "next-auth/client";
import { Formik, useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";

const CreateProfileName = ({ user }) => {
  const [message, setMessage] = useState();

  const nameSchema = Yup.object().shape({
    profileName: Yup.string()
      .min(4, "Too Short!")
      .matches(/^\S*$/, "No puede tener espacios entre las palabras")
      .max(15, "Too Long!")
      .required("Required"),
  });
  // const [session] = useSession();

  return (
    <>
      <Formik
        initialValues={{ profileName: "" }}
        validationSchema={nameSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const res = await axios.put(`/api/users/${user.id}`, values);
            console.log(res.data.data);
            resetForm();
          } catch (error) {
            console.log(error);
            setMessage(error.message);
          }
        }}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          resetForm,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <FormControl
              id='profileName'
              isRequired
              isInvalid={touched.profileName && errors.profileName}>
              <FormLabel>
                Hola {user.name} Elegí el nombre de tu perfil
              </FormLabel>
              <Input
                placeholder='Ej: baloDelMattone'
                type='text'
                size='md'
                value={values.profileName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormHelperText>
                Este va a ser el nombre por el que los demás te podrán encontrar
              </FormHelperText>
              <FormErrorMessage>{errors.profileName}</FormErrorMessage>
            </FormControl>
            <Button type='submit'>Guardar</Button>
          </form>
        )}
      </Formik>
      <Text>{message}</Text>
    </>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

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
      user: session.user,
    },
  };
}

export default CreateProfileName;
