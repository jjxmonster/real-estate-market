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
  email?: string;
  users: Array<string>;
  airtableID: string;
  stripeCheckoutID: string;
  stripeCheckoutStatus: string;
  highlightDuration: number;
  highlightTill: Date;
  viewsCounter: number;
};

// helpers
export type ApartmentCategory = "rent" | "sale" | null;

export enum NotificatonType {
  DANGER,
  INFORMATION,
  SUCCESS,
}

// payloads
export type OfferPayload = {
  title: string;
  location: string;
  price: number;
  description: string;
  area: number;
  category: "rent" | "sale";
  image_url: string;
};
export type UserPayload = {
  email: string;
  name: string;
  password: string;
};

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
export type OfferFormType = {
  title: string;
  location: string;
  price: number;
  description: string;
  area: number;
  category: ApartmentCategory;
  image_url: FileList | null;
  mobile: number;
};

export type ContactFormType = {
  message: string;
  name: string;
  email: string;
};

export type RegisterFormType = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type OfferFormKeysType =
  | "title"
  | "category"
  | "location"
  | "description"
  | "price"
  | "area"
  | "image_url"
  | "mobile";

export type ProductType = {
  airtableID: string;
  id: string;
  name: string;
  priceCents: number;
  priceCurrency: string;
  duration: number;
};

export type CheckoutPayloadType = {
  id: string;
  offerID: number;
  quantity: number;
};
