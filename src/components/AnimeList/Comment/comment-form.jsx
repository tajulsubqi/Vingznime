"use client";

import Image from "next/image";
import { useState, useTransition } from "react";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";
import avatar from "@/public/images/avatar.svg";
import { postComment } from "@/src/actions/comment";

const CommentForm = ({
  anime_mal_id,
  anime_title,
  user_email,
  user_name,
  user_image,
}) => {
  const [isPending, startTransition] = useTransition();
  const [comment, setComment] = useState("");

  //rating
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);

  const handleInput = (event) => {
    setComment(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    //validate that the value is not empty
    if (rating < 1 || rating > 5 || comment === "") {
      toast.error("Please provide a rating and comments before submitting.");
      return;
    }

    // validate against spam, max 30 letters per word
    const words = comment.split(" ");
    const hasTooLongWord = words.some((word) => word.length > 30);

    if (hasTooLongWord) {
      toast.error(
        "The word is too long. The maximum length is 30 letters per word."
      );
      return;
    }

    // Validate total letters (max 5000)
    if (comment.length > 5000) {
      toast.error("Comment is too long. The maximum length is 5000 letters.");
      return;
    }

    const values = {
      user_email,
      anime_mal_id,
      anime_title,
      comment,
      rating,
    };

    startTransition(() => {
      postComment(values).then((data) => {
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
    <section className="flex flex-col gap-3">
      <section className="flex container gap-3">
        <Image
          src={user_image || avatar.src}
          alt=""
          width={48}
          height={48}
          className="aspect-square h-10 w-10 md:h-12 md:w-12 shrink-0 object-cover object-center rounded-full"
        />
        <div className="flex flex-col">
          <p className="text-Absolute-White leading-none md:text-lg font-semibold tracking-wide">
            {user_name}
          </p>
          <section className="flex gap-1 cursor-pointer">
            {[...Array(5)].map((star, index) => {
              const currentRating = index + 1;

              return (
                <label key={index}>
                  <input
                    disabled={isPending}
                    type="radio"
                    value={currentRating}
                    onClick={() => setRating(currentRating)}
                    className="hidden"
                  />

                  <FaStar
                    weight="fill"
                    className={`text-xl md:text-2xl transition-colors ${
                      isPending ? "cursor-default" : "cursor-pointer"
                    }`}
                    color={
                      isPending
                        ? currentRating <= rating
                          ? "#ff3333"
                          : "#999999"
                        : currentRating <= (hover || rating)
                        ? "#ff3333"
                        : "#999999"
                    }
                    onMouseEnter={() => setHover(currentRating)}
                    onMouseLeave={() => setHover(null)}
                  />
                </label>
              );
            })}
          </section>
        </div>
      </section>

      <textarea
        disabled={isPending}
        rows={6}
        className="w-full text-sm tracking-wide text-Absolute-White outline-none py-2 px-4 overscroll-contain bg-Black-12 rounded-lg"
        placeholder="Write a comment..."
        onChange={handleInput}
        value={comment}
      ></textarea>

      <button
        disabled={isPending}
        onClick={onSubmit}
        className="w-fit rounded-lg items-center px-5 py-2 bg-Absolute-White text-Black-8 font-semibold hover:bg-opacity-75 transition-colors disabled:cursor-progress"
      >
        Post a comment
      </button>
    </section>
  );
};

export default CommentForm;
