"use client";

import { useTransition } from "react";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { Trash } from "@phosphor-icons/react";
import { toast } from "react-toastify";
import { formatDate } from "@/src/libs/utils";
import { deleteComment } from "@/src/actions/comment";
import Header from "@/src/components/AnimeList/Header";

const Comments = ({ groupedComments }) => {
  const [isPending, startTransition] = useTransition();

  const onDelete = (id) => {
    const values = { id };

    startTransition(() => {
      deleteComment(values).then((data) => {
        if (data?.success) {
          toast.success(data.success);
        }

        if (data?.error) {
          toast.error(data.error);
        }
      });
    });
  };

  return (
    <section className="container w-full text-Absolute-White">
      <Header title="Comment History" />

      {!groupedComments.length > 0 ? (
        <>
          <p className="flex justify-center items-center text-Grey-60">
            You haven't made any comments yet...
          </p>
        </>
      ) : (
        <div className="flex flex-col gap-3">
          {groupedComments.map((group) => {
            const lastIndex = group.comments.length - 1;

            return (
              <div
                key={group.createdAtDate.toISOString()}
                className="flex flex-col gap-3"
              >
                <p className="text-lg font-semibold tracking-wide bg-Grey-60/10 p-3 rounded-lg">
                  {formatDate(group.createdAtDate, "fullDate")}
                </p>

                {group.comments.map((comment, index) => {
                  return (
                    <section
                      key={comment.id}
                      className={`flex flex-col ${
                        index !== lastIndex && "border-b-2 border-Black-12 pb-3"
                      }`}
                    >
                      <div className="flex justify-between items-center cursor-pointer">
                        <Link
                          href={`/anime/${comment.anime_mal_id}`}
                          className="flex flex-col w-full"
                        >
                          <p className="text-base md:text-lg font-semibold tracking-wide">
                            {comment.anime_title}
                          </p>

                          <section className="flex gap-1">
                            {[...Array(5)].map((star, index) => {
                              return (
                                <FaStar
                                  key={index}
                                  weight="fill"
                                  className="transition-colors w-4 h-4"
                                  color={
                                    index + 1 <= comment.rating
                                      ? "#ff3333"
                                      : "#999999"
                                  }
                                />
                              );
                            })}
                          </section>

                          <p>{comment.comment}</p>
                        </Link>

                        <button
                          disabled={isPending}
                          onClick={() => onDelete(comment.id)}
                          className=" rounded-full p-2 transition-colors hover:bg-Grey-60/20 disabled:cursor-progress"
                        >
                          <Trash size={20} />
                        </button>
                      </div>
                    </section>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Comments;
