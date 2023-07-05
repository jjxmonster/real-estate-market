import { useEffect, useState } from "react";

import { ConversationType } from "types/common";
import supabase from "services/supabase";

const useConversations = (userID: string) => {
  const [conversations, setConversations] = useState<Array<ConversationType>>(
    []
  );

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return conversations;
};

export default useConversations;
