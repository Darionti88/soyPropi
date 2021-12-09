import React from "react";
import Image from "next/image";

const QRcode = ({ imageUrl }) => {
  return (
    <Image
      src={imageUrl}
      alt='qrCode'
      height={550}
      width={550}
      layout='intrinsic'
    />
  );
};

export default QRcode;
