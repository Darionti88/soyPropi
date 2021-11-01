import React from "react";
import Image from "next/image";
import Link from "next/link";

import HotImage from "../assets/images/mobileHow.svg";
import { Button } from "@chakra-ui/button";

const HowItWorks = () => {
  return (
    <div className='flex md:flex-row xs:flex-col h-screen space-x-20'>
      <div className=' flex-1 justify-center flex items-center'>
        <Image src={HotImage} alt='Mobile_Confirmation' />
      </div>
      <div className=' flex-1 flex flex-col items-center justify-center  py-10 space-y-10 '>
        <h5 className='text-3xl font-exo2 font-bold '>
          Como funciona <span className='propi text-5xl'>Propi</span> ?
        </h5>
        <p className='text-2xl font-hind font-medium'>
          Si elegís una cuenta <span className='font-bold'>Negocio</span> vas a
          poder agregar las cuentas de Mercado Pago de tus empleados y al final
          de la jornada vas a poder repartir lo que se juntó en partes iguales
          (o asignando porcentajes) automáticamente
        </p>
        <p className='text-2xl font-hind font-medium'>
          Si elegís una cuenta <span className='font-bold'>Individual</span>{" "}
          toda la propina va a quedar en tu cuenta de Mercado Pago
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

export default HowItWorks;
