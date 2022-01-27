import React from "react";
import Image from "next/image";

const SaveButton = ({ onClick, type, icon, title, bgColor, width }) => {
  return (
    <button
      type={type && type}
      onClick={onClick && onClick}
      className={`cssbuttons-io-button items-center overflow-hidden 
  relative h-14 ${
    width ? width : "w-full"
  } pl-3 rounded-xl flex font-bold justify-center py-3 
  ${bgColor} text-white font-metro text-xl`}>
      {title}
      <div className='icon'>
        <Image src={icon} alt='icon' />
      </div>
    </button>
  );
};

export default SaveButton;
