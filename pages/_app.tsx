import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import "../styles/navbar.styles.css";
import { Provider } from "next-auth/client";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "../components/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Provider session={pageProps.session}>
        <Navbar />
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
