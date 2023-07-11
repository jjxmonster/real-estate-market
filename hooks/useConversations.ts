import { useEffect, useState } from "react";

import { Conversation } from "types/common";
import supabase from "services/supabase";

const useConversations = (defaultValue: Array<Conversation>) => {
  const [conversations, setConversations] = useState<Array<Conversation>>([]);

  useEffect(() => {
    const channel = supabase
      .channel("conversations-channel")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "conversations",
        },
        payload => {
          const updatedConversation = payload.new as Conversation;

          setConversations(prevConversations => {
            return [
              ...prevConversations.filter(
                conversation => conversation.id !== updatedConversation.id
              ),
              updatedConversation,
            ];
          });
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setConversations(defaultValue);
  }, [defaultValue]);

  return conversations;
};

export default useConversations;
