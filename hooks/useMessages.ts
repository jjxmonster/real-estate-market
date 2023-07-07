import { useEffect, useState } from "react";

import { Message } from "types/common";
import supabase from "services/supabase";

const useMessages = (conversationID: string): Message[] => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const channel = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
        },
        payload => {
          const newMessage = payload.new as Message;
          if (newMessage && newMessage.conversation_id === conversationID) {
            setMessages(prevMessages => [...prevMessages, newMessage]);
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [conversationID]);

  return messages;
};

export default useMessages;
