"use client";

import { useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { Trash } from "@phosphor-icons/react";
import { collection as deleteCollection } from "@/src/actions/collection";
import Header from "@/src/components/AnimeList/Header";

const Collection = ({ collection }) => {
  const [isPending, startTransition] = useTransition();

  const onDelete = (anime_mal_id, user_email) => {
    const values = { anime_mal_id, user_email };

    startTransition(() => {
      deleteCollection(values).then((data) => {
        if (data?.success) {
          toast.success(data.success);
        }
      });
    });
  };

  return (
    <section className="container w-full">
      <Header title="Collection" />

      {!collection.length > 0 ? (
        <>
          <p className="flex justify-center items-center text-Grey-60">
            You haven't added any anime to the collection...
          </p>
        </>
      ) : (
        <div className="h-max w-full shrink-0 flex flex-col gap-3">
          {collection.map((collect, index) => {
            return (
              <div key={index} className="relative flex items-center">
                <Link
                  href={`/anime/${collect.anime_mal_id}`}
                  className="group flex flex-row w-full cursor-pointer h-20 bg-Black-10 rounded-lg text-Absolute-White items-center transition-colors hover:bg-Grey-60/20 "
                >
                  <div className="w-auto h-auto">
                    <Image
                      src={collect.anime_image}
                      alt={collect.anime_image}
                      width={64}
                      height={100}
                      className="object-cover object-center rounded-l-lg aspect-[3/4] "
                    />
                  </div>

                  <section className="flex flex-col px-5 w-full">
                    <p className="text-Absolute-White font-medium text-xl tracking-wide line-clamp-1">
                      {collect.anime_title}
                    </p>
                  </section>
                </Link>

                <div className="group absolute top-5 right-5 text-Absolute-White transition-colors group-hover:bg-Grey-60/20">
                  <button
                    disabled={isPending}
                    onClick={() =>
                      onDelete(collect.anime_mal_id, collect.user_email)
                    }
                    className=" rounded-full p-2 bg-transparent hover:bg-Grey-60/20"
                  >
                    <Trash size={20} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Collection;
