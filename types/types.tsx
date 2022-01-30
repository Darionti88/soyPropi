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

export type FullUser = {
  _id: string;
  name: string;
  email: string;
  image: string;
  emailVerified: null;
  createdAt: Date;
  updatedAt: Date;
  accountType: string;
  profileName: string;
};
