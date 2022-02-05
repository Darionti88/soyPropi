import React from "react";
import QRcode from "./QRcode";
import { jsPDF } from "jspdf";
import { ArrowBackIcon, DownloadIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { QRProps } from "../../types/types";

const QrCodeViewer: React.FC<QRProps> = ({
  setImageUrl,
  imageUrl,
  profileName,
}) => {
  const handleSaveQrCode = () => {
    const doc = new jsPDF("p", "pt", "a4");
    doc.setFontSize(30);
    doc.html(document.getElementById("qrcode"), {
      callback: function (doc) {
        doc.save(`propi${profileName}.pdf`);
      },
    });
  };

  return (
    <div className='flex flex-row w-full jusify-center items-center'>
      <div className='flex flex-col space-y-10  w-1/4'>
        <Button
          leftIcon={<ArrowBackIcon />}
          colorScheme='messenger'
          size='lg'
          width='100%'
          variant='solid'
          onClick={() => setImageUrl("")}>
          Volver
        </Button>
        <Button
          leftIcon={<DownloadIcon />}
          colorScheme='messenger'
          size='lg'
          width='100%'
          variant='solid'
          onClick={() => handleSaveQrCode()}>
          Guardar
        </Button>
      </div>
      <div
        id='qrcode'
        className='flex flex-col text-5xl h-full w-3/4 items-center justify-center'>
        <p className='text-4xl text-primary-mpago700 mb-2 font-exo2 font-bold'>
          Propi
        </p>
        <p className='text-2xl mb-7'>
          Escanea el Código QR y elegí el monto de la propina!
        </p>
        <QRcode imageUrl={imageUrl} />
      </div>
    </div>
  );
};

export default QrCodeViewer;
