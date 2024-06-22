"use server"

import { db } from "@/src/libs/prisma"
import { CommentSchema } from "@/src/schemas"
import { revalidatePath } from "next/cache"

type CommentInput = {
  id: string
  anime_mal_id: string
  anime_title: string
  user_email: string
  rating: number
  comment: string
}

export const updateComment = async (values: CommentInput) => {
  const validatedFields = await CommentSchema.validate(values)

  if (!validatedFields) {
    return { error: "Invalid fields" }
  }

  const existingComment = await db.comment.findUnique({
    where: { id: validatedFields.anime_mal_id },
  })

  if (!existingComment) {
    return { error: "Comment does not exist!" }
  }

  await db.comment.update({
    where: { id: existingComment.id },
    data: {
      comment: validatedFields.comment,
      rating: validatedFields.rating,
      createdAt: new Date(),
    },
  })

  revalidatePath(`/anime/${validatedFields.anime_mal_id}`)
  revalidatePath("/users/comment")
  return { success: "Successfully updated your comment!" }
}

export const postComment = async (values) => {
  const validatedFields = await CommentSchema.validate(values)

  if (!validatedFields) {
    return { error: "Invalid fields" }
  }

  const { user_email, anime_mal_id } = validatedFields

  const alreadyExist = await db.comment.findFirst({
    where: { anime_mal_id: anime_mal_id, user_email: user_email },
  })

  if (alreadyExist) {
    return { error: "You have commented on this anime!" }
  }

  await db.comment.create({
    data: {
      anime_mal_id: validatedFields.anime_mal_id,
      anime_title: validatedFields.anime_title,
      user_email: validatedFields.user_email,
      rating: validatedFields.rating,
      comment: validatedFields.comment,
    },
  })

  revalidatePath(`/anime/${anime_mal_id}`)
  revalidatePath("/users/comment")
  return { success: "Successfully added a comment!" }
}

export const deleteComment = async (values) => {
  const selectComment = await db.comment.findUnique({
    where: { id: values.id },
  })

  if (!selectComment) {
    return { error: "Comment does not exist!" }
  }

  await db.comment.delete({
    where: { id: selectComment.id },
  })

  revalidatePath(`/anime/${values.anime_mal_id}`)
  revalidatePath("/users/comment")
  return { success: "successfully deleted your comment!" }
}
