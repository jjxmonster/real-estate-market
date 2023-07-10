import { useEffect, useState } from "react";

import { Conversation } from "types/common";
import supabase from "services/supabase";

const useConversations = (
  userID: string,
  defaultValue: Array<Conversation>
) => {
  const [conversations, setConversations] =
    useState<Array<Conversation>>(defaultValue);

  useEffect(() => {
    const getAllConversations = async () => {
      const { data, error } = await supabase
        .from("conversations")
        .select("*")
        .contains("participants", [userID]);

      if (data && !error) {
        setConversations(data);
      }
    };

    getAllConversations();

    const channel = supabase
      .channel("schema-db-changes")
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

  return conversations;
};

export default useConversations;
