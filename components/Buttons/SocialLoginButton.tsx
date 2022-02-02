import React from "react";
import Image from "next/image";
import { ButtonProps } from "../../types/types";

const SocialLoginButton = ({
  title,
  bgColor,
  icon,
  onClick,
  text,
}: ButtonProps) => (
  <button
    onClick={onClick}
    className={`${bgColor} flex w-full items-center shadow-md border-2 space-x-3 
    rounded-md md:w-1/2 justify-center overflow-hidden 
  transition-all duration-200 p-3 social_button`}>
    <div className='svg-wrapper-1'>
      <div className='svg-wrapper '>
        <Image className='svg overflow-visible' src={icon} alt='icon' />
      </div>
    </div>
    <p
      className={`ml-3 transition-all duration-300 ease-in-out font-hind font-semibold md:text-xl ${text}`}>
      {title}
    </p>
  </button>
);

export default SocialLoginButton;
