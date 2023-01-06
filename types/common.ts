export interface LoadingStateType {
  isLoading: boolean;
  message: string;
}

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

export type ApartmentCategory = "rent" | "sell" | null;

export type OfferFormStateType = {
  title: string;
  location: string;
  price: number;
  description: string;
  area: number;
  category: ApartmentCategory;
  image_url: FileList | null;
};

export type OfferPayload = {
  title: string;
  location: string;
  price: number;
  description: string;
  area: number;
  category: "rent" | "sell";
  image_url: string;
};
