import { ApartmentCategory } from "../types/common";

export const jsonFetcher = (url: string) => fetch(url).then(res => res.json());

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
