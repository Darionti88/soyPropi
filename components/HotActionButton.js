import React from "react";
import Image from "next/image";
import Link from "next/link";

import HotImage from "../assets/images/mobileConfirm.svg";

const HotActionButton = () => {
  return (
    <div className='container flex md:flex-row-reverse flex-col  flex-wrap'>
      <div className=' flex-1 justify-center flex items-center '>
        <Image src={HotImage} alt='Mobile_Confirmation' />
      </div>
      <div className=' flex-1 justify-evenly flex flex-col items-center px-10'>
        <p className='text-2xl'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci,
          cupiditate quidem! Beatae, sint! Iste, doloribus labore possimus
          incidunt saepe distinctio aperiam ratione aliquam odio porro
          temporibus cum dolorem quod libero!
        </p>
        <Link href='/signin' passHref>
          <a className='rounded bg-blue-300 hover:bg-blue-600 text-4xl text-white py-3 px-3'>
            Individual
          </a>
        </Link>
        <Link href='/signin' passHref>
          <a className='rounded bg-blue-300 hover:bg-blue-600 text-4xl  text-white py-3 px-3'>
            Business
          </a>
        </Link>
      </div>
    </div>
  );
};

export default HotActionButton;
