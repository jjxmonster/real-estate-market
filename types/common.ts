import { Attachment } from "airtable";

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
  image: Array<Attachment>;
};

export type ApartmentCategory = "rent" | "sell" | null;

export type OfferFormStateType = {
  title: string;
  address: string;
  price: number;
  description: string;
  area: number;
  category: ApartmentCategory;
  images: FileList | null;
};
