"use server";

import { getUserByEmail, getUserById } from "@/data/user";
import { db } from "@/src/libs/prisma";
import { currentUser } from "@/src/libs/auth";
import { generateVerificationToken } from "@/src/libs/tokens";
import { sendVerificationEmail } from "@/src/libs/mail";
import { ProfileSchema } from "@/src/schemas";
import { revalidatePath } from "next/cache";

export const profile = async (values) => {
  const validatedFields = await ProfileSchema.validate(values);

  if (!validatedFields.name) {
    validatedFields.name = undefined;
  }

  if (!validatedFields.email) {
    validatedFields.email = undefined;
  }

  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  if (user.isOAuth) {
    validatedFields.email = undefined;
    validatedFields.isTwoFactorEnabled = undefined;
  }

  if (validatedFields.email && validatedFields.email !== user.email) {
    const existingUser = await getUserByEmail(validatedFields.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in use!" };
    }

    const verificationToken = await generateVerificationToken(
      validatedFields.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        pendingEmail: verificationToken.email,
      },
    });

    return { success: "Verification email sent!" };
  }

  await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...validatedFields,
    },
  });

  revalidatePath('/users')
  return { success: "Profile updated!" };
};
