import React from "react";
import Image from "next/image";
import HotImage from "../assets/images/delivery.svg";

const HowItWorks = () => {
  return (
    <div className='flex md:flex-row-reverse flex-col-reverse md:w-4/6 w-5/6 space-y-5'>
      <div className='block  w-full'>
        <Image
          src={HotImage}
          alt='Mobile_Confirmation'
          height={600}
          width={620}
          layout='responsive'
        />
      </div>
      <div className='flex flex-col justify-center py-6  space-y-10 '>
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
