import { db } from "@/src/libs/prisma";

export const getAccountByUserId = async (userId) => {
  try {
    const account = await db.account.findFirst({
      where: { userId },
    });

    return account;
  } catch {
    return null;
  }
};
