import React, { FunctionComponent } from "react";

import ChatInput from "components/ChatInput/ChatInput";
import MessagesContainer from "components/Messages/Messages";
import { UserIcon } from "components/Icons/Icons";
import { conversationState } from "atoms/atoms";
import { useRecoilValue } from "recoil";

const Conversation: FunctionComponent = () => {
  const { activeConversation } = useRecoilValue(conversationState);

  return (
    <div className="w-4/6 h-[700px] bg-gray-800 flex flex-col rounded-md">
      {activeConversation ? (
        <>
          <div className="w-full flex items-center p-5 mb-5 border-b-2 border-gray-dark">
            <div className="text-yellow pr-5">
              <UserIcon />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-semibold text-xl">
                {activeConversation.name}
              </span>
            </div>
          </div>
          <MessagesContainer conversation_id={activeConversation.id} />
          <ChatInput />
        </>
      ) : (
        <div className="w-full h-full flex items-center flex-col justify-center gap-y-5">
          <span className="text-yellow font-light text-xl">
            No conversation selected
          </span>
          <span className="text-gray-500">
            Select a conversation from the list to start chatting with other
            users.
          </span>
        </div>
      )}
    </div>
  );
};

export default Conversation;
