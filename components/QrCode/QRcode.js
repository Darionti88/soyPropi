import React from "react";
import Image from "next/image";

const QRcode = ({ imageUrl }) => {
  return (
    <Image
      src={imageUrl}
      alt='qrCode'
      height={400}
      width={400}
      layout='intrinsic'
    />
  );
};

export default QRcode;
