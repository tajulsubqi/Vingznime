import { db } from "@/src/libs/prisma";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import avatar from "@/public/images/avatar.svg";
import { formatDate } from "@/src/libs/utils";

const CommentBox = async ({ user_email, anime_mal_id }) => {
  const comments = await db.comment.findMany({
    include: {
      user: true,
    },
    where: { anime_mal_id: anime_mal_id, NOT: { user_email: user_email } },
    orderBy: {
      id: "desc",
    },
  });

  return (
    <div className="flex flex-col">
      {comments.map((comment) => {
        return (
          <section
            key={comment.id}
            className="flex gap-3 border-t-2 border-Black-12 py-7 text-Absolute-White "
          >
            <Image
              src={comment.user.image || avatar.src}
              alt=""
              width={40}
              height={40}
              className="aspect-square h-10 w-10 shrink-0 object-cover object-center rounded-full"
            />

            <div className="flex flex-col w-full ">
              <p className="leading-5">{comment.user.name}</p>

              <p className="text-xs text-Grey-60">
                {formatDate(comment.createdAt, "date")}
              </p>

              <section className="flex gap-1">
                {[...Array(5)].map((star, index) => {
                  return (
                    <FaStar
                      key={index}
                      weight="fill"
                      className="transition-colors w-4 h-4"
                      color={
                        index + 1 <= comment.rating ? "#ff3333" : "#999999"
                      }
                    />
                  );
                })}
              </section>

              <p className="text-sm md:text-base">{comment.comment}</p>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default CommentBox;
