"use server"

import bcrypt from "bcryptjs"
import { db } from "@/src/libs/prisma"
import { RegisterSchema } from "@/src/schemas"
import { getUserByEmail, getUserByPendingEmail } from "@/data/user"
import { generateVerificationToken } from "@/src/libs/tokens"
import { sendVerificationEmail } from "@/src/libs/mail"

export const register = async (values) => {
  const validatedFields = await RegisterSchema.validate(values)

  if (!validatedFields) {
    return { error: "Invalid fields!" }
  }

  const { email, password, name } = validatedFields

  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser =
    (await getUserByEmail(email)) || (await getUserByPendingEmail(email))

  if (existingUser) {
    return { error: "Email already in use!" }
  }

  await db.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
    },
  })

  const verificationToken = await generateVerificationToken(email)

  await sendVerificationEmail(verificationToken.email, verificationToken.token)

  return { success: "Confirmation email sent!" }
}
