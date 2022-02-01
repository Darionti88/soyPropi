import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import "../styles/navbar.styles.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "../components/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <SessionProvider session={pageProps.session}>
        <Navbar />
        <Component {...pageProps} />
      </SessionProvider>
    </ChakraProvider>
  );
}

export default MyApp;
