import { Conversation } from "types/common";
import supabase from "services/supabase";

export const getConversationForUser = async (
  userID: string
): Promise<Conversation[]> => {
  const { data, error } = await supabase
    .from("conversations")
    .select("*")
    .contains("participants", [userID]);

  if (data && !error) {
    return data;
  }

  return [];
};
