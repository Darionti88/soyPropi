import { Button } from "@chakra-ui/button";
import { VStack } from "@chakra-ui/layout";
import { signIn, signOut } from "next-auth/react";

import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Signin = () => {
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
