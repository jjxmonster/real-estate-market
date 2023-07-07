import React, { FunctionComponent, useEffect } from "react";

import { UserIcon } from "components/Icons/Icons";
import useConversations from "hooks/useConversations";
import { useSession } from "next-auth/react";

interface ConversationListProps {}

interface ConversationListItemProps {}

const ConversationListItem: FunctionComponent<
  ConversationListItemProps
> = () => {
  return (
    <div className="w-full bg-gray-800 rounded-md flex items-center p-5 mb-5 cursor-pointer">
      <div className="text-yellow pr-5">
        <UserIcon />
      </div>
      <div className="flex flex-col">
        <span className="text-white font-semibold text-xl">John Doe</span>
        <span className="text-gray-500 font-extralight text-m">
          Lorem ipsum dolor sit amet
        </span>
      </div>
    </div>
  );
};

const ConversationList: FunctionComponent<ConversationListProps> = () => {
  const { data } = useSession();
  const conversations = useConversations(data?.user.id as string);

  console.log(conversations);

  const renderConversations = conversations.map(conversation => {
    return <ConversationListItem key={conversation.id} />;
  });

  const getids = async () => {
    const response = await fetch("/api/users", {
      method: "GET",
    });

    console.log(response);
  };

  useEffect(() => {
    getids();
  }, []);

  return (
    <div className="w-2/6  overflow-y-scroll p-5 pt-0 no-scrollbar max-h-[700px]">
      {renderConversations}
    </div>
  );
};

export default ConversationList;
