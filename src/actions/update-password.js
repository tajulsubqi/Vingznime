"use server";

import { getUserById } from "@/data/user";
import { db } from "@/src/libs/prisma";
import { currentUser } from "@/src/libs/auth";
import bcrypt from "bcryptjs";
import { ChangePasswordSchema } from "@/src/schemas";
import { revalidatePath } from "next/cache";

export const updatePassword = async (values) => {
  const validatedFields = await ChangePasswordSchema.validate(values);

  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  if (user.isOAuth) {
    validatedFields.password = undefined;
    validatedFields.newPassword = undefined;
  }

  if (
    validatedFields.password &&
    validatedFields.newPassword &&
    dbUser.password
  ) {
    const passwordMatch = await bcrypt.compare(
      validatedFields.password,
      dbUser.password
    );

    if (!passwordMatch) {
      return { error: "Incorrect password!" };
    }

    const hashedPassword = await bcrypt.hash(validatedFields.newPassword, 10);

    validatedFields.password = hashedPassword;
    validatedFields.newPassword = undefined;
  }

  await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...validatedFields,
    },
  });

  revalidatePath("/users");
  return { success: "Password changed!" };
};
