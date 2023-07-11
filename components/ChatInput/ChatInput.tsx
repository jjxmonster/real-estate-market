import React, { FunctionComponent, useState } from "react";

import { SendMessageIcon } from "components/Icons/Icons";
import { activeConversationState } from "atoms/atoms";
import supabase from "services/supabase";
import { useRecoilValue } from "recoil";
import { useSession } from "next-auth/react";

const ChatInput: FunctionComponent = ({}) => {
  const { activeConversation } = useRecoilValue(activeConversationState);
  const { data } = useSession();
  const [message, setMessage] = useState<string>("");

  const sendMessage = async () => {
    const response = await Promise.all([
      supabase.from("messages").insert([
        {
          conversation_id: activeConversation?.id,
          author: data?.user.id,
          text: message,
        },
      ]),
      supabase
        .from("conversations")
        .update({ last_message: message, updated_at: new Date() })
        .eq("id", activeConversation?.id),
    ]);

    if (response) {
      setMessage("");
    }
  };
  return (
    <div className="h-20 px-5 mb-5 flex items-center justify-center">
      <input
        onChange={e => setMessage(e.target.value)}
        value={message}
        type="text"
        className="w-full bg-transparent text-white h-full rounded-3xl border-2 border-gray-400 p-5 outline-none ring-0 "
        placeholder="Type your message..."
      />
      <div
        className={`${
          message.length === 0 && "opacity-50 pointer-events-none	"
        } rounded-full border-2 ml-5 border-yellow_opacity cursor-pointer`}
        onClick={sendMessage}
      >
        <SendMessageIcon />
      </div>
    </div>
  );
};

export default ChatInput;
