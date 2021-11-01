import React from "react";
import Image from "next/image";
import Link from "next/link";

import HotImage from "../assets/images/mobilePay.svg";
import { Button } from "@chakra-ui/button";

const HotActionButton = () => {
  return (
    <div className='flex md:flex-row-reverse xs:flex-col h-screen space-x-20'>
      <div className=' flex-1 justify-center flex items-center'>
        <Image src={HotImage} alt='Mobile_Confirmation' />
      </div>
      <div className=' flex-1 flex flex-col items-center justify-center  py-10 space-y-10 '>
        <h5 className='text-6xl font-exo2 font-bold '>
          Ahora con <span className='propi text-8xl'>Propi</span> las propinas
          son Cashless
        </h5>
        <p className='text-2xl font-hind font-medium'>
          Si sos un negocio vas a poder cobrar las propinas a través de un
          Código QR y repartir el total de la jornada entre todos los que
          trabajaron.
          <br /> Y si cobrás tu propia propina todo va a tu cuenta!
        </p>
        <Button
          color='#FFF'
          backgroundColor='#F57C00'
          width='30%'
          variant='solid'
          size='lg'
          alignSelf='flex-start'>
          Crear Cuenta
        </Button>
      </div>
    </div>
  );
};

export default HotActionButton;
