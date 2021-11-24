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
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import dbConnect from "../../lib/mongodb";
import User from "../../models/User";
import axios from "axios";

function EditProfile({ data }) {
  const [newProfileName, setNewProfileName] = useState(data.profileName);

  const handleSubmitProfileName = async () => {
    const response = await axios.put(`/api/users/${data._id}`, {
      profileName: newProfileName,
    });
    alert("Nombre de Perfil Actualizado");
  };

  return (
    <div className='container mx-auto p-10 h-screen items-center justify-center flex-col'>
      <h1 className='text-4xl mb-10'>
        Hola {data.name}. Acá podes editar tur perfil
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
            variant='solid'>
            Generar mi código QR
          </Button>
        </VStack>
      </ButtonGroup>
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
