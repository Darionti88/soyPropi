import React from "react";
import QRcode from "./QRcode";
import { ArrowBackIcon, DownloadIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";

const QrCodeViewer = ({ setImageUrl, imageUrl, handleSaveQrCode }) => (
  <div className='flex flex-col w-full jusify-center items-center'>
    <div className='flex flex-row space-x-10 py-10 w-full'>
      <Button
        leftIcon={<ArrowBackIcon />}
        colorScheme='messenger'
        size='lg'
        width='50%'
        variant='solid'
        onClick={() => setImageUrl("")}>
        Volver
      </Button>
      <Button
        leftIcon={<DownloadIcon />}
        colorScheme='messenger'
        size='lg'
        width='50%'
        variant='solid'
        onClick={() => handleSaveQrCode}>
        Guardar
      </Button>
    </div>
    <div className='flex w-full items-center justify-center '>
      <QRcode imageUrl={imageUrl} />
    </div>
  </div>
);

export default QrCodeViewer;
