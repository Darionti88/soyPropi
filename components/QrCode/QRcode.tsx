import Image from "next/image";
import { QRProps } from "../../types/types";

const QRcode: React.FC<QRProps> = ({ imageUrl }) => {
  return (
    <Image
      src={imageUrl}
      alt='qrCode'
      height={400}
      width={400}
      layout='intrinsic'
    />
  );
};

export default QRcode;
