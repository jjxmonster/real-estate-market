import React, { FunctionComponent, useEffect } from "react";

import { Conversation } from "types/common";
import { UserIcon } from "components/Icons/Icons";
import { conversationState } from "atoms/atoms";
import useConversations from "hooks/useConversations";
import useConversationsUsers from "hooks/useConversationsUsers";
import { useSession } from "next-auth/react";
import { useSetRecoilState } from "recoil";

interface ConversationListItemProps {
  conversation: Conversation;
  name: string;
  lastMessage: string;
}
interface ConversationListProps {
  conversations: Array<Conversation>;
}

const ConversationListItem: FunctionComponent<ConversationListItemProps> = ({
  name,
  lastMessage,
  conversation,
}) => {
  const setActiveConversation = useSetRecoilState(conversationState);

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
      className="w-full bg-gray-800 rounded-md flex items-center p-5 mb-5 cursor-pointer"
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

const ConversationList: FunctionComponent<ConversationListProps> = ({
  conversations,
}) => {
  const { data } = useSession();

  const convesatiationsUsersIds = conversations.map(conv => {
    return conv.participants.filter(id => id !== data?.user.id);
  });
  const conversationsUsers = useConversationsUsers(
    convesatiationsUsersIds.flat()
  );

  const renderConversations = conversations.map(conversation => {
    const userForConversation = conversationsUsers.find(user =>
      conversation.participants.includes(user.id)
    );
    return (
      <ConversationListItem
        key={conversation.id}
        name={userForConversation?.name as string}
        conversation={conversation}
        lastMessage="test"
      />
    );
  });

  return (
    <div className="w-2/6  overflow-y-scroll p-5 pt-0 no-scrollbar max-h-[700px]">
      {renderConversations}
    </div>
  );
};

export default ConversationList;
