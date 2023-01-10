export type ApartmentOffer = {
  area: number;
  category: string;
  created_at: string;
  description: string;
  id: number;
  location: string;
  mobile: string;
  price: number;
  status: string;
  title: string;
  updated_at: string;
  image_url: string;
};

export type ApartmentCategory = "rent" | "sale" | null;

export type OfferPayload = {
  title: string;
  location: string;
  price: number;
  description: string;
  area: number;
  category: "rent" | "sale";
  image_url: string;
};
export enum NotificatonType {
  DANGER,
  INFORMATION,
  SUCCESS,
}

// atoms
export interface NotificationStateType {
  type: NotificatonType | null;
  message: string;
  isVisible: boolean;
}
export interface LoadingStateType {
  isLoading: boolean;
  message: string;
}
export type OfferFormStateType = {
  title: string;
  location: string;
  price: number;
  description: string;
  area: number;
  category: ApartmentCategory;
  image_url: FileList | null;
};
