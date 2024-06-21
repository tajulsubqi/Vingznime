"use client";

import { toast } from "react-toastify";
import { collection } from "@/src/actions/collection";
import { BookmarkSimple } from "@phosphor-icons/react";
import { useTransition } from "react";

const CollectionButton = ({
  anime_mal_id,
  user_email,
  anime_title,
  anime_image,
  existingCollection,
}) => {
  const [isPending, startTransition] = useTransition();

  const onSubmit = () => {
    const values = { anime_mal_id, user_email, anime_title, anime_image };

    startTransition(() => {
      collection(values).then((data) => {
        if (data?.success) {
          toast.success(data.success);
        }
      });
    });
  };

  return (
    <button
      disabled={isPending}
      onClick={onSubmit}
      className={`flex flex-nowrap rounded-lg justify-center items-center gap-1 p-2 font-semibold text-sm transition-all ${
        existingCollection
          ? "bg-Grey-60/10 text-Absolute-White hover:bg-Grey-60/20"
          : "bg-Absolute-White text-Black-8 hover:bg-opacity-75"
      } disabled:cursor-progress disabled:bg-opacity-50`}
    >
      <BookmarkSimple size={20} />
      {existingCollection ? "Remove From Collection" : "Add To Collection"}
    </button>
  );
};

export default CollectionButton;
