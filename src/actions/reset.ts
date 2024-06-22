"use server";

import { getUserByEmail } from "@/data/user";
import { ResetSchema } from "@/src/schemas";
import { sendPasswordResetEmail } from "@/src/libs/mail";
import { generatePasswordResetToken } from "@/src/libs/tokens";

export const reset = async (values) => {
  const validatedFields = await ResetSchema.validate(values);

  if (!validatedFields) {
    return { error: "Invalid email!" };
  }

  const { email } = validatedFields;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email not found!" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "Reset email sent!" };
};
