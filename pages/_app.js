import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import { Provider } from "next-auth/client";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "../components/Navbar";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Provider session={pageProps.session}>
        <Navbar />
        <div className='container mx-auto'>
          <Component {...pageProps} />
        </div>
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
