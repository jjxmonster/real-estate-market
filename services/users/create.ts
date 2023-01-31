import airDB from "services/airtableClient";
import Joi from "joi";
import crypto from "crypto";

import { UserPayload } from "types/common";
import { getHashedPassword } from "utils";

const schema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  password: Joi.string().required(),
});

const checkEmail = async (email: string) => {
  const existingUser = await airDB("users")
    .select({ filterByFormula: `email="${email}"` })
    .firstPage();

  if (existingUser && existingUser[0]) {
    throw new Error("email_taken");
  }
};

const create = async (payload: UserPayload) => {
  const { email, name, password } = await schema.validateAsync(payload);
  await checkEmail(email);
  const passwordSalt = crypto.randomBytes(16).toString("hex");
  const passwordHash = getHashedPassword(password, passwordSalt);

  const user = await airDB("users").create([
    {
      fields: {
        email,
        name,
        passwordSalt,
        passwordHash,
        role: "regular",
      },
    },
  ]);

  return user;
};

export default create;
