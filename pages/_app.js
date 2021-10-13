import "tailwindcss/tailwind.css";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "../src/components/Navbar";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <div className='container mx-auto'>
        <Navbar />
        <Component {...pageProps} />
      </div>
    </ChakraProvider>
  );
}

export default MyApp;
