import { db } from "@/src/libs/prisma"

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } })

    return user
  } catch {
    return null
  }
}

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } })

    return user
  } catch {
    return null
  }
}

export const getUserByPendingEmail = async (email: string) => {
  try {
    return await db.user.findFirst({
      where: {
        pendingEmail: email,
      },
    })
  } catch {
    return null
  }
}
