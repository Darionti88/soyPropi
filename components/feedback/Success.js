import React from "react";
import Image from "next/image";

const Success = ({ image, text }) => {
  return (
    <div className=' w-screen h-min md:h-max  items-center flex space-y-7 justify-center mt-5 flex-col'>
      <div className='w-screen h-96   relative'>
        <Image
          objectFit='contain'
          className=''
          src={image}
          alt='success'
          layout='fill'
        />
      </div>
      <div className='h-min md:h-1/6 w-full md:w-5/6 flex flex-col space-y-5  items-center justify-center'>
        <h1 className='text-6xl font-exo2 text-center'>{text}</h1>
        <h3 className='text-4xl font-exo2 text-center'>
          En breve serás redirigido...
        </h3>
      </div>
    </div>
  );
};

export default Success;
