import {
  ConversationStateType,
  LoadingStateType,
  NotificationStateType,
} from "../types/common";

import { atom } from "recoil";

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

// CHAT
export const conversationState = atom<ConversationStateType>({
  key: "conversationState",
  default: {
    activeConversation: null,
  },
});
