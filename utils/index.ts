import crypto from "crypto";

import { ApartmentCategory } from "../types/common";

export const jsonFetcher = (url: string) => fetch(url).then(res => res.json());

export const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const URL = {
  OFFERS_PAGE: "/offers",
  HOME_PAGE: "/",
  OFFER_PAGE: "/offers/",
  THANKS_PAGE: "/offers/thanks",
  NEW_OFFER_PAGE: "/offers/new",
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
  { label: "Sale", value: "sale" },
];

export const offerFormFields: Array<{
  key:
    | "title"
    | "category"
    | "location"
    | "description"
    | "price"
    | "area"
    | "image_url";
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
    key: "location",
    label: "Location",
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
    key: "image_url",
    label: "image",
    placeholder: "",
    type: "file",
  },
];

export const registerFormFields: Array<{
  key: "name" | "email" | "password" | "password_confirmation";
  label: string;
  type: string;
  placeholder: string;
}> = [
  {
    key: "name",
    label: "Name",
    type: "text",
    placeholder: "John",
  },
  {
    key: "email",
    label: "E-mail",
    type: "text",
    placeholder: "john@example.com",
  },
  {
    key: "password",
    label: "Password",
    type: "password",
    placeholder: "Must have at least 6 characters",
  },
  {
    key: "password_confirmation",
    label: "Password Confirmation",
    type: "password",
    placeholder: "Confirm your password",
  },
];

export const loginrormFields: Array<{
  key: "email" | "password";
  label: string;
  type: string;
  placeholder: string;
}> = [
  {
    key: "email",
    label: "E-mail",
    type: "text",
    placeholder: "john@example.com",
  },
  {
    key: "password",
    label: "Password",
    type: "password",
    placeholder: "strongpassword123",
  },
];

export const getHashedPassword = (password: string, salt: string) =>
  crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
