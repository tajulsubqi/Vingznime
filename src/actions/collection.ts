"use server";

import { db } from "@/src/libs/prisma";
import { revalidatePath } from "next/cache";

export const collection = async (values) => {
  const alreadyExist = await db.collection.findFirst({
    where: { anime_mal_id: values.anime_mal_id, user_email: values.user_email },
  });

  if (alreadyExist) {
    await db.collection.delete({
      where: { id: alreadyExist.id },
    });

    revalidatePath("/users/collection");
    revalidatePath(`/anime/${values.anime_mal_id}`);
    return { success: "Successfully removed from your collection!" };
  }

  await db.collection.create({
    data: { ...values },
  });

  revalidatePath(`/anime/${values.anime_mal_id}`);
  revalidatePath('/users/comment')
  return { success: "Successfully added to collection!" };
};
