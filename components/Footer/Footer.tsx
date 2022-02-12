import { useDisclosure } from "@chakra-ui/react";
import React, { FC } from "react";
import DisclaimerModal from "../DisclaimerModal/DisclaimerModal";

const Footer: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const year: number = new Date().getFullYear();

  return (
    <>
      <footer className=' h-14 w-screen bg-orange-200 flex items-center px-10 justify-evenly'>
        <p className='text-1xl md:text-2xl text-text font-metro font-bold'>
          Propi © {year}
        </p>
        <p
          onClick={onOpen}
          className='text-1xl md:text-2xl text-text font-metro font-italic underline font-bold hover:cursor-pointer'>
          Términos
        </p>
      </footer>
      <DisclaimerModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Footer;
