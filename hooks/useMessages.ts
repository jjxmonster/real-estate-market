import { useEffect, useState } from "react";

import { Message } from "types/common";
import supabase from "services/supabase";

const useMessages = (conversationID: number): Message[] => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const getAllMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", conversationID);

      if (data && !error) {
        setMessages(data);
      }
    };

    getAllMessages();

    const channel = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
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
