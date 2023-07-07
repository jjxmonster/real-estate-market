import React, { FunctionComponent } from "react";

import { UserIcon } from "components/Icons/Icons";
import useMessages from "hooks/useMessages";

interface ChatProps {
  conversationId: string;
}

const Conversation: FunctionComponent<ChatProps> = ({ conversationId }) => {
  // const messages = useMessages(conversationId)
  return (
    <div className="w-4/6 h-[700px] bg-gray-800 flex flex-col rounded-md">
      <div className="w-full flex items-center p-5 mb-5 border-b-2 border-gray-dark">
        <div className="text-yellow pr-5">
          <UserIcon />
        </div>
        <div className="flex flex-col">
          <span className="text-white font-semibold text-xl">John Doe</span>
        </div>
      </div>
      <div className="w-full h-full"></div>
    </div>
  );
};

export default Conversation;
