import { Auth } from "@aws-amplify/auth";
import "../configureAmplify";
import { useRouter } from "next/router";
import { Button } from "@chakra-ui/button";
import { VStack } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Image } from "@chakra-ui/image";

const Signin = () => {
  const [user, setUser] = useState({});
  const router = useRouter();

  const checkUser = async () => {
    const user = await Auth.currentAuthenticatedUser();
    setUser(user);
  };

  useEffect(() => {
    checkUser();
  }, []);
  console.log(user.attributes.picture);

  const userSignIn = async (provider) => {
    const user = await Auth.federatedSignIn({ provider: provider });
    setUser(user);
    router.push("/profile");
  };

  return (
    <div>
      <VStack>
        <Button
          onClick={() => userSignIn("Facebook")}
          size='lg'
          colorScheme='facebook'
          leftIcon={<FaFacebook />}>
          Facebook
        </Button>
        <Button
          onClick={() => userSignIn("Google")}
          size='lg'
          textColor='#333'
          borderColor='#333'
          borderWidth={0.1}
          colorScheme='whiteAlpha'
          leftIcon={<FcGoogle />}>
          Google
        </Button>
        <Button
          onClick={() => Auth.signOut()}
          size='lg'
          textColor='#FFF'
          colorScheme='blackAlpha'>
          Sign Out
        </Button>
      </VStack>
      <Image
        alt='ProfilePic'
        src={
          user
            ? user.attributes.picture
            : "https://developers.google.com/web/images/web-fundamentals-icon192x192_72.png"
        }
      />
    </div>
  );
};

export default Signin;
