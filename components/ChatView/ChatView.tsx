import * as React from "react";

import Conversation from "components/Conversation/Conversation";
import ConversationList from "components/ConversationsList/ConversationList";
import useConversations from "hooks/useConversations";
import { useSession } from "next-auth/react";

const ChatView = () => {
  const { data } = useSession();
  const conversations = useConversations(data?.user.id as string);

  return (
    <div className="flex">
      {conversations.length && (
        <ConversationList conversations={conversations} />
      )}
      <Conversation />
    </div>
  );
};

export default ChatView;
