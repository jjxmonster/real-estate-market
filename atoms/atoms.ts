import { atom } from "recoil";

import { LoadingStateType, NotificationStateType } from "../types/common";

// LOADING
export const loadingState = atom<LoadingStateType>({
  key: "loadingState",
  default: {
    isLoading: false,
    message: "",
  },
});

// NOTIFICATION
export const notificationState = atom<NotificationStateType>({
  key: "notificationState",
  default: {
    type: null,
    message: "",
    isVisible: false,
  },
});
