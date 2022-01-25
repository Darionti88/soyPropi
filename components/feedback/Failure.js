import React from "react";

const Failure = ({ status }) => {
  return (
    <div className='container mx-auto bg-red-500 h-screen items-center flex justify-center flex-col'>
      <div className='text-7xl'>{status}</div>
    </div>
  );
};

export default Failure;
