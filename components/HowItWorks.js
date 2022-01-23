import React from "react";
import Image from "next/image";
import HotImage from "../assets/images/delivery.svg";

const HowItWorks = () => {
  return (
    <div className='flex md:flex-row xs:flex-col h-screen space-x-20'>
      <div className=' flex-1 justify-center  block'>
        <Image
          src={HotImage}
          alt='Mobile_Confirmation'
          height={600}
          width={620}
          layout='responsive'
        />
      </div>
      <div className=' flex-1 flex flex-col items-center justify-center  py-10 space-y-10 '>
        <h5 className='text-3xl font-exo2 font-bold '>
          Como funciona <span className='propi text-5xl'>Propi</span> ?
        </h5>
        <div className='flex-start space-y-5'>
          <p className='text-2xl font-hind font-medium'>
            Crea tu cuenta en Propi, linkeala con tu cuenta de Mercado Pago y
            listo! vas a poder generar tu propio QR donde, al escanearlo, van a
            poder poner que monto te quieren dar de propina.
          </p>
          <p className='text-2xl font-hind font-medium'>
            No tener efectivo ya no es una excusa!
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
