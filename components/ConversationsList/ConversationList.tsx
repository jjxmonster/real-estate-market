import React, { FunctionComponent, useCallback } from "react";
import { activeConversationState, conversationsState } from "atoms/atoms";
import { useRecoilState, useRecoilValue } from "recoil";

import { Conversation } from "types/common";
import { UserIcon } from "components/Icons/Icons";
import useConversations from "hooks/useConversations";
import { useSession } from "next-auth/react";

interface ConversationListItemProps {
  conversation: Conversation;
  name: string;
  lastMessage: string;
}

const ConversationListItem: FunctionComponent<ConversationListItemProps> = ({
  name,
  lastMessage,
  conversation,
}) => {
  const [{ activeConversation }, setActiveConversation] = useRecoilState(
    activeConversationState
  );

  const handleChangeActiveConversation = () => {
    setActiveConversation({
      activeConversation: {
        ...conversation,
        name,
      },
    });
  };
  return (
    <div
      className={`w-full border-gray-700 border rounded-md flex items-center p-5 mb-5 cursor-pointer relative after:absolute after:invisible after:top-0 after:left-0 after:border-yellow after:border-l-2 !after:border-md after:border-t-2 after:w-0 after:h-0 after:ease after:transition-all	 hover:after:h-full hover:after:w-full hover:after:visible before:absolute before:invisible before:bottom-0 before:right-0 before:rounded-md before:border-yellow before:border-b-2 before:border-r-2 before:w-0 before:h-0 before:ease before:transition-all	 hover:before:h-full hover:before:w-full hover:before:visible after:duration-300 before:duration-300 ${
        activeConversation?.id === conversation.id &&
        "before:h-full before:w-full before:!visible after:rounded-md after:!visible after:w-full after:h-full"
      }`}
      onClick={handleChangeActiveConversation}
    >
      <div className="text-yellow pr-5">
        <UserIcon />
      </div>
      <div className="flex flex-col">
        <span className="text-white font-semibold text-xl">{name}</span>
        <span className="text-gray-500 font-extralight text-m">
          {lastMessage}
        </span>
      </div>
    </div>
  );
};

const ConversationList: FunctionComponent = () => {
  const { conversationsUsers, conversations } =
    useRecoilValue(conversationsState);
  const { data } = useSession();
  const realtimeConversations = useConversations(
    data?.user.id as string,
    conversations
  );

  const renderConversations = useCallback(
    () =>
      realtimeConversations.map(conversation => {
        const userForConversation = conversationsUsers.find(user =>
          conversation.participants.includes(user.id)
        );

        return (
          <ConversationListItem
            key={conversation.id}
            name={userForConversation?.name as string}
            conversation={conversation}
            lastMessage={conversation.last_message}
          />
        );
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [realtimeConversations]
  );

  return (
    <div className="w-2/6  overflow-y-scroll p-5 pt-0 no-scrollbar max-h-[700px]">
      {renderConversations()}
    </div>
  );
};

export default ConversationList;
