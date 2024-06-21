import { db } from "@/src/libs/prisma";

export const getTwoFactorTokenByToken = async (token) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findUnique({
      where: { token },
    });

    return twoFactorToken;
  } catch {
    return null;
  }
};

export const getTwoFactorTokenByEmail = async (email) => {
    try {
      const twoFactorToken = await db.twoFactorToken.findFirst({
        where: { email },
      });
  
      return twoFactorToken;
    } catch {
      return null;
    }
  };