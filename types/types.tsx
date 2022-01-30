export type ButtonProps = {
  onClick?: () => void;
  type?: any;
  title: string;
  bgColor: string;
  width?: string;
  icon: string;
};

export type QRProps = {
  imageUrl: string;
  setImageUrl?: (imageUrl: string) => void;
  handleSaveQrCode?: () => void;
};

export type SessionUser = {
  name?: string;
  email?: string;
  image?: string;
  id?: string;
};

// export type FullUser = {
//   _id: string;
//   name: string;
//   email: string;
//   image: string;
//   emailVerified: null;
//   createdAt: Date;
//   updatedAt: Date;
//   accountType: string;
//   profileName: string;
// };

export type MercadoPagoUser = {
  _id: string;
  name: string;
  email: string;
  image: string;
  emailVerified: null;
  createdAt: Date;
  updatedAt: Date;
  accountType: string;
  profileName: string;
  access_token: string;
  expires_in: number;
  live_mode: boolean;
  public_key: string;
  refresh_token: string;
  scope: string;
  token_type: string;
  user_id: number;
};
