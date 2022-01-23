import React from "react";
import Image from "next/image";
import Link from "next/link";

import HotImage from "../assets/images/mobilePay.svg";
import { Button } from "@chakra-ui/button";

const HotActionButton = () => {
  return (
    <div className='flex md:flex-row-reverse xs:flex-col h-screen space-x-20'>
      <div className=' flex-1 justify-center flex items-center'>
        <Image
          src={HotImage}
          height={674}
          width={856}
          alt='Mobile_Confirmation'
        />
      </div>
      <div className=' flex-1 flex flex-col items-start justify-center py-6 space-y-12 '>
        <h5 className='text-4xl font-exo2 font-bold '>
          Con <span className='propi text-6xl'>Propi</span> las propinas son
          Cashless
        </h5>
        <p className='text-2xl font-hind font-medium'>
          Ahora vas a poder recibir tu propina simplemente a través de un QR
        </p>
        <button className='button_signin'>
          <span className='button_top text-lg'> Crear Cuenta</span>
        </button>{" "}
      </div>
    </div>
  );
};

export default HotActionButton;
