import {
  ActiveConversationStateType,
  ConversationsStateType,
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
export const activeConversationState = atom<ActiveConversationStateType>({
  key: "conversationState",
  default: {
    activeConversation: null,
  },
});

export const conversationsState = atom<ConversationsStateType>({
  key: "activeConversationsState",
  default: {
    conversations: [],
    conversationsUsers: [],
  },
});
