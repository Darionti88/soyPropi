import React from "react";
import Image from "next/image";
import SuccessImage from "../../assets/images/feedbackImages/success.svg";

const Success = ({ status }) => {
  return (
    <div className=' w-screen h-min md:h-max  items-center flex space-y-7 justify-center mt-5 flex-col'>
      <div className='w-screen h-96   relative'>
        <Image
          objectFit='contain'
          className=''
          src={SuccessImage}
          alt='success'
          layout='fill'
        />
      </div>
      <div className='h-min md:h-1/6 w-full md:w-5/6 flex  items-center justify-center'>
        <h1 className='text-6xl font-exo2 text-center'>
          Tu pago fue aprobado! Muchas gracias!
        </h1>
      </div>
    </div>
  );
};

export default Success;
