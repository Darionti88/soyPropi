import { signIn } from "next-auth/react";
import Facebook from "../../assets/svgIcons/facebook.svg";
import Google from "../../assets/svgIcons/google.svg";
import Login from "../../assets/images/login.svg";
import SocialLoginButton from "../../components/Buttons/SocialLoginButton";
import Image from "next/image";

const Signin = () => {
  return (
    <div
      className='flex md:flex-row w-5/6 md:w-full mx-auto px-10 
    space-x-5 container space-y-5 justify-center items-center'>
      <div className='md:block  md:w-1/2'>
        <Image
          src={Login}
          height={674}
          width={856}
          alt='Mobile_Confirmation'
          layout='responsive'
        />
      </div>
      <div
        className='w-full md:w-1/2 h-96 bg-gray-50 signin_card border-[1px] shadow-lg border-opacity-5 
      rounded-md border-text flex px-3 flex-col'>
        <div className=' h-2/4  w-full py-5 space-y-4 flex flex-col justify-between items-center'>
          <h1 className=' text-3xl font-exo2 font-bold text-text'>Login</h1>
          <h3 className=' text-sm  font-hindi font-bold text-text px-5 text-center'>
            - Podes hacerlo con tu cuenta de Google o Facebook 😀 -
          </h3>
        </div>
        <div
          className='flex flex-col space-y-5 w-full items-center py-5 h-2/4
        justify-center '>
          <SocialLoginButton
            onClick={() =>
              signIn("facebook", {
                callbackUrl: "http://localhost:3000/edit_account",
              })
            }
            title='Facebook'
            bgColor='bg-[#3d5a98]'
            icon={Facebook}
            text='text-white'
          />
          <SocialLoginButton
            onClick={() =>
              signIn("google", {
                callbackUrl: "http://localhost:3000/edit_account",
              })
            }
            title='Google'
            bgColor='bg-[#FFF]'
            icon={Google}
            text='text-text'
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
