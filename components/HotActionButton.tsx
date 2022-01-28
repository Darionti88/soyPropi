import Image from "next/image";
import HotImage from "../assets/images/mobilePay.svg";

const HotActionButton: React.FC = () => {
  return (
    <div className='flex md:flex-row-reverse flex-col-reverse w-5/6 md:w-4/6 space-y-5'>
      <div className='block  w-full'>
        <Image
          src={HotImage}
          height={674}
          width={856}
          alt='Mobile_Confirmation'
          layout='responsive'
        />
      </div>
      <div className='flex flex-col justify-center py-6  space-y-10 '>
        <h5 className='text-4xl font-exo2 font-bold '>
          Con <span className='propi text-6xl'>Propi</span> las propinas son
          Cashless
        </h5>
        <p className='text-2xl font-hind font-medium'>
          Ahora vas a poder recibir tu propina simplemente a través de un QR
        </p>
        <button className='button_signin'>
          <span className='button_top text-lg'> Crear Cuenta</span>
        </button>{" "}
      </div>
    </div>
  );
};

export default HotActionButton;
