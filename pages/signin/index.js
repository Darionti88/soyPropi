import { Button } from "@chakra-ui/button";
import { VStack } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import { signIn, signOut } from "next-auth/client";

import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Signin = () => {
  const [user, setUser] = useState();

  return (
    <div className='h-screen'>
      <VStack>
        <Button
          onClick={() => signIn("facebook")}
          size='lg'
          colorScheme='facebook'
          leftIcon={<FaFacebook />}>
          Facebook
        </Button>
        <Button
          onClick={() => signIn("google")}
          size='lg'
          textColor='#333'
          borderColor='#333'
          borderWidth={0.1}
          colorScheme='whiteAlpha'
          leftIcon={<FcGoogle />}>
          Google
        </Button>
        <Button
          onClick={() => signOut()}
          size='lg'
          textColor='#FFF'
          colorScheme='blackAlpha'>
          Sign Out
        </Button>
      </VStack>
    </div>
  );
};

export default Signin;
