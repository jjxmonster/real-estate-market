import airDB from "services/airtableClient";
import Joi from "joi";

import { UserPayload } from "types/common";
import { getHashedPassword } from "utils";
import { User } from "next-auth";

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const authorize = async (
  payload: Omit<UserPayload, "name">
): Promise<User | null> => {
  const { email, password } = await schema.validateAsync(payload);

  const [user] = await airDB("users")
    .select({ filterByFormula: `email="${email}"` })
    .firstPage();

  if (!user) {
    return null;
  }

  const passwordHash = getHashedPassword(
    password,
    String(user.fields.passwordSalt)
  );

  if (passwordHash !== user.fields.passwordHash) {
    return null;
  }
  return {
    id: user.id,
    email: user.fields.email as string,
    name: user.fields.name as string,
    role: user.fields.role as string,
  };
};

export default authorize;
