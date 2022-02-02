import Image from "next/image";
import HotImage from "../assets/images/mobilePay.svg";

const HotActionButton: React.FC = () => {
  return (
    <div className='flex md:flex-row-reverse flex-col-reverse w-5/6 md:w-4/6 space-y-5 items-center justify-center mb-12'>
      <div className='flex flex-col justify-center  space-y-6'>
        <h5 className='text-5xl font-exo2 font-bold '>
          Con{" "}
          <span className='propi text-7xl text-primary-mpago700'>Propi</span>{" "}
          las propinas son Cashless
        </h5>
        <p className='text-2xl font-hind font-medium text-center mb-5'>
          Ahora vas a poder recibir tu propina simplemente a través de un QR
        </p>
        <button className='button_signin w-3/4 self-center mt-5'>
          <span className='button_top text-lg'> Crear Cuenta</span>
        </button>{" "}
      </div>
    </div>
  );
};

export default HotActionButton;
