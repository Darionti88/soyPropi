import { Mercadopago } from "@prisma/client";

export type ButtonProps = {
  onClick?: () => void;
  type?: any;
  title: string;
  bgColor: string;
  width?: string;
  icon: string;
  text?: string;
};

export type QRProps = {
  imageUrl: string;
  setImageUrl?: (imageUrl: string) => void;
  handleSaveQrCode?: () => void;
  profileName?: string;
};

export type SessionUser = {
  name?: string;
  email?: string;
  image?: string;
  id?: string;
};

export type FullUser = {
  id: string;
  name: string;
  email: string;
  image: string;
  emailVerified: boolean;
  accountType?: string;
  profileName?: string;
  mercadopago?: Mercadopago;
};
