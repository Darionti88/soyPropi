import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Text,
  Select,
} from "@chakra-ui/react";
import { getSession } from "next-auth/client";
import { Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useRouter } from "next/router";
import User from "../../models/User";

const CreateProfileName = ({ user }) => {
  const [message, setMessage] = useState();
  const router = useRouter();

  const profileSchema = Yup.object().shape({
    profileName: Yup.string()
      .min(4, "Too Short!")
      .matches(/^\S*$/, "No puede tener espacios entre las palabras")
      .max(20, "Too Long!")
      .required("Required"),
    accountType: Yup.string().required("Required"),
  });

  return (
    <>
      <Formik
        initialValues={{ profileName: "", accountType: "individual" }}
        validationSchema={profileSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            await axios.put(`/api/users/${user.id}`, values);
            resetForm();
            setMessage("");
            router.push(`/edit_account`);
          } catch (err) {
            console.log(err);
            setMessage(err.message);
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
            <FormControl
              id='accountType'
              isRequired
              isInvalid={touched.accountType && errors.accountType}>
              <FormLabel>Que tipo de cuenta querés?</FormLabel>
              <Select
                name='accountType'
                value={values.accountType}
                placeholder='Seleccioná tipo de Cuenta'
                onBlur={handleBlur}
                onChange={handleChange}>
                <option value='individual'>Individual</option>
                <option value='business'>Business</option>
              </Select>
              <FormHelperText>
                El tipo de cuenta depende de que necesitas
              </FormHelperText>
              <FormErrorMessage>{errors.accountType}</FormErrorMessage>
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
