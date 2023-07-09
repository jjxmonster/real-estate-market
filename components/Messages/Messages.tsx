import React, { FunctionComponent } from "react";

import SingleMessage from "components/SingleMessage/SingleMessages";
import useMessages from "hooks/useMessages";
import { useSession } from "next-auth/react";

interface MessagesContainerProps {
  conversation_id: number;
}

const MessagesContainer: FunctionComponent<MessagesContainerProps> = ({
  conversation_id,
}) => {
  const messages = useMessages(conversation_id);
  const { data } = useSession();

  return (
    <div className="w-full h-full p-5 overflow-y-scroll no-scrollbar rotate-180">
      {messages.toReversed().map(message => {
        const isFromLoggedUser = message.author === data?.user.id;
        return (
          <SingleMessage
            key={message.id}
            text={message.text}
            isFromLoggedUser={isFromLoggedUser}
          />
        );
      })}
    </div>
  );
};

export default MessagesContainer;
