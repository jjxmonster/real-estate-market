import { ChatParticipant } from "types/common";
import airDB from "services/airtableClient";

export const getUsersByIds = async (
  usersIds: Array<string>
): Promise<Array<ChatParticipant>> => {
  const data = await airDB("users")
    .select({
      fields: ["name"],
      filterByFormula: `OR( RECORD_ID() = '${usersIds.join(
        "', RECORD_ID() = '"
      )}')`,
    })
    .firstPage();

  const users = data.map(item => ({
    id: item.id,
    name: item.fields.name as string,
  }));

  return users;
};
