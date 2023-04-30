import { useState } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import axios from "axios";
import Image from "next/image";
import prisma from "../lib/prisma";
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
import { User } from "@prisma/client";
import { FullUser } from "../types/types";

function Profile({ user }: { user: FullUser }) {
  const [total, setTotal] = useState<string>("");
  const [custom, setCustom] = useState<string>("");
  const [orderData, setOrderData] = useState({
    userAccessToken: user.mercadopago?.access_token,
    description: `Propina para ${user?.profileName}`,
    quantity: 1,
  });

  const calculateTip = (percentage: number, value: string) => {
    const totalTip = (Number(value) * percentage) / 100;
    return totalTip;
  };

  const startCheckout = async (tip: number) => {
    const response = await createPreference({ ...orderData, price: tip });
    window.location.href = response.data.urlSandbox;
  };

  return (
    <div className='container mx-auto items-center flex flex-1 justify-center flex-col mb-4 bg-red-700'>
      {/* <h1 className='md:text-4xl text-2xl md:mb-10 mb-4 font-hindi text-center mt-10'>
          Gracias por darle propina a {user.profileName}
        </h1> */}
      {/* <div className='w-4/6 md:w-1/5'>
          <FormControl id='profileName' mb={20} w='100%'>
            <FormLabel size='xl' textAlign='center'>
              Total de la Cuenta
            </FormLabel>
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
                  onChange={(e) => setTotal(e.target.value)}
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
                  onChange={(e) => setCustom(e.target.value)}
                />
              </InputGroup>
            </HStack>
          </FormControl>
        </div> */}
      {/* {user.mercadopago ? (
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
              onClick={() => startCheckout(calculateTip(15, total))}
              colorScheme='messenger'
              size='lg'
              width={300}
              variant='solid'>
              15%: {total && `$${calculateTip(15, total)}`}
            </Button>
            <Button
              onClick={() => startCheckout(calculateTip(20, total))}
              colorScheme='messenger'
              size='lg'
              width={300}
              variant='solid'>
              20%: {total && `$${calculateTip(20, total)}`}
            </Button>
            <Button
              onClick={() => startCheckout(Number(custom))}
              colorScheme='messenger'
              size='lg'
              width={300}
              variant='solid'>
              Custom: {custom && `$${custom}`}
            </Button>
          </VStack>
        </ButtonGroup>
      ) : (
        <div className='h-full flex items-center bg-green-100 justify-center'>
          <h1 className='text-2xl text-center'>
            Lo siento, el usuario que buscas todavía no Linkeo su cuenta de
            Mercado Pago
          </h1>
        </div>
      )} */}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const profileName = context.params.profile;
  const singleUser = await prisma.user.findUnique({
    where: { profileName: String(profileName) },
    include: { mercadopago: true },
  });
  if (!singleUser) {
    return { notFound: true };
  }
  const user = JSON.parse(JSON.stringify(singleUser));
  return {
    props: { user },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axios.get("http://localhost:3000/api/users");
  const users: User[] = res.data.data;
  const paths = users.map((user) => ({
    params: { profile: user.profileName },
  }));
  return { paths, fallback: "blocking" };
};

export default Profile;
