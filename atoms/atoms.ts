import { atom } from "recoil";

import { OfferFormStateType } from "../types/common";

// OFFER FORM
export const offerFormState = atom<OfferFormStateType>({
  key: "offerFormState",
  default: {
    title: "",
    category: null,
  },
});
