import React, { useEffect } from "react";
import { useRouter } from "next/router";

const Tip = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 1000);
  }, [router]);

  return (
    <div className='flex w-screen h-screen justify-center items-center'>
      <h1 className='text-6xl font-bold'>Redirecting to Home...</h1>
    </div>
  );
};

export default Tip;
