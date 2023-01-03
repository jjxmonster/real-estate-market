import { ApartmentCategory } from "../types/common";

export const jsonFetcher = (url: string) => fetch(url).then(res => res.json());

export const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const formatCurrency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const categoryDropdownItems: Array<{
  label: string;
  value: ApartmentCategory;
}> = [
  { label: "Rent", value: "rent" },
  { label: "Sell", value: "sell" },
];

export const offerFormFields: Array<{
  key:
    | "title"
    | "category"
    | "address"
    | "description"
    | "price"
    | "area"
    | "image";
  label: string;
  type: string;
  placeholder: string;
}> = [
  {
    key: "title",
    label: "Title",
    type: "text",
    placeholder: "Beautiful house in New York",
  },
  {
    key: "category",
    label: "Category",
    type: "dropdown",
    placeholder: "",
  },
  {
    key: "price",
    label: "Price [$]",
    type: "number",
    placeholder: "$0",
  },
  {
    key: "address",
    label: "Address",
    type: "text",
    placeholder: "Street 12, New York",
  },
  {
    key: "description",
    label: "Description",
    type: "area",
    placeholder: "Tell us something more about property that you offer",
  },
  {
    key: "area",
    label: "Area [m²]",
    type: "number",
    placeholder: "m²",
  },
  {
    key: "image",
    label: "image",
    placeholder: "",
    type: "file",
  },
];
