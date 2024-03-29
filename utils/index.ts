import { ApartmentCategory, OfferFormKeysType } from "../types/common";

import crypto from "crypto";

export const jsonFetcher = (url: string) => fetch(url).then(res => res.json());

export const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
export const sortByDate = <T extends Record<string, any>>(
  array: Array<T>,
  key: string
): Array<T> => {
  return array.sort((a, b) => {
    return new Date(b[key]).getTime() - new Date(a[key]).getTime();
  });
};

export const URL = {
  OFFERS_PAGE: "/offers",
  HOME_PAGE: "/",
  OFFER_PAGE: "/offers/",
  THANKS_PAGE: "/offers/thanks",
  NEW_OFFER_PAGE: "/offers/new",
  REGISTER_PAGE: "/user/register",
  LOGIN_PAGE: "/user/signin",
  MY_OFFERS_PAGE: "/offers/my",
  ADMIN_PANEL: "/admin/offers",
  FAV_OFFERS: "/offers/favourites",
  CHAT: "/chat",
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
  key: OfferFormKeysType;
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
    key: "mobile",
    label: "Phone Number",
    type: "text",
    placeholder: "Provide your phone number for users interested in your offer",
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

export const contactFormFields: Array<{
  key: "name" | "email" | "message";
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
    key: "message",
    label: "Message",
    type: "area",
    placeholder: "Ask your questions here...",
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

export const userDropdownItems = [
  { label: "My offers", path: URL.MY_OFFERS_PAGE },
  { label: "Create new offer", path: URL.NEW_OFFER_PAGE },
  { label: "Admin Panel", path: URL.ADMIN_PANEL },
  { label: "Favourite Offers", path: URL.FAV_OFFERS },
  { label: "Conversations", path: URL.CHAT },
];

export const getHashedPassword = (password: string, salt: string) =>
  crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
