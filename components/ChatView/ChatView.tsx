import Conversation from "components/Conversation/Conversation";
import ConversationList from "components/ConversationsList/ConversationList";
import React from "react";

const ChatView = () => {
  return (
    <div className="flex">
      <ConversationList />
      <Conversation />
    </div>
  );
};

export default ChatView;
