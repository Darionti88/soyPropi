import { useState } from "react";
import { GetStaticProps, GetStaticPaths } from "next";

import axios from "axios";
import User from "../models/User";
import dbConnect from "../lib/mongodb";
import Image from "next/image";

import { createPreference } from "../lib/mercadopago";
import {
  Input,
  FormControl,
  FormLabel,
  InputLeftAddon,
  InputGroup,
  Button,
  ButtonGroup,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { GetSessionOptions } from "next-auth/client";
import { FullUser } from "../types/types";

function Profile({ user }) {
  const [total, setTotal] = useState<number>(null);
  const [custom, setCustom] = useState<number>(null);
  const [price, setPrice] = useState(null);
  const [orderData, setOrderData] = useState({
    userAccessToken:
      "APP_USR-1678221936079962-123114-e22472427bf9483149902a0a0c799271-1048752270", //Deshardcodear
    description: `Propina para ${user?.profileName}`,
    quantity: 1,
  });

  const calculateTip = (percentage: number, value: number) => {
    const totalTip = (value * percentage) / 100;
    return totalTip;
  };

  const startCheckout = async (tip) => {
    setPrice(tip);
    const response = await createPreference({ ...orderData, price: tip });
    console.log(response);
    window.location.href = response.data.urlSandbox;
    console.log(orderData);
  };

  return (
    <>
      <div className='container mx-auto h-screen items-center flex justify-center flex-col'>
        <div className='block h-300 mb-10'>
          <Image
            className='rounded-full'
            src={user.image}
            width={200}
            height={200}
            alt='userAvatar'
            layout='fixed'
          />
        </div>
        <h1 className='text-4xl mb-10'>
          Gracias por darle propina a {user.profileName}
        </h1>
        <FormControl id='profileName' mb={20} w='20%'>
          <FormLabel>Total de la Cuenta</FormLabel>
          <HStack>
            <InputGroup size='lg'>
              <InputLeftAddon>ARS</InputLeftAddon>
              <Input
                variant='filled'
                size='lg'
                type='number'
                placeholder='1500'
                value={total}
                backgroundColor='#FFF'
                onChange={(e) => setTotal(Number(e.target.value))}
              />
            </InputGroup>
          </HStack>
          <HStack>
            <InputGroup size='lg' mt={5}>
              <InputLeftAddon>Custom</InputLeftAddon>
              <Input
                variant='filled'
                size='lg'
                type='number'
                placeholder='120'
                value={custom}
                backgroundColor='#FFF'
                onChange={(e) => setCustom(Number(e.target.value))}
              />
            </InputGroup>
          </HStack>
        </FormControl>
        <ButtonGroup className='pb-8'>
          <VStack>
            <Button
              onClick={() => startCheckout(calculateTip(10, total))}
              colorScheme='telegram'
              size='lg'
              width={300}
              variant='solid'>
              10%: {total && `$${calculateTip(10, total)}`}
            </Button>
            <Button
              colorScheme='messenger'
              size='lg'
              width={300}
              variant='solid'>
              15%: {total && `$${calculateTip(15, total)}`}
            </Button>
            <Button
              colorScheme='messenger'
              size='lg'
              width={300}
              variant='solid'>
              20%: {total && `$${calculateTip(20, total)}`}
            </Button>
            <Button
              colorScheme='messenger'
              size='lg'
              width={300}
              variant='solid'>
              Custom: {custom && `$${custom}`}
            </Button>
          </VStack>
        </ButtonGroup>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  await dbConnect();
  const profileName = context.params.profile;
  const singleUser = await User.findOne({ profileName: profileName });
  if (!singleUser) {
    return { notFound: true };
  }
  const user: FullUser = JSON.parse(JSON.stringify(singleUser));
  return {
    props: { user },
  };
};

export async function getStaticPaths() {
  const res = await axios.get("http://localhost:3000/api/users");
  const users = res.data.data;
  const paths = users.map((user) => ({
    params: { profile: user.name },
  }));
  return { paths, fallback: "blocking" };
}

export default Profile;