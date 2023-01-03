import { atom } from "recoil";

import { OfferFormStateType } from "../types/common";

// OFFER FORM
export const offerFormState = atom<OfferFormStateType>({
  key: "offerFormState",
  default: {
    title: "",
    address: "",
    price: 0,
    description: "",
    area: 0,
    category: null,
    image: null,
  },
});
