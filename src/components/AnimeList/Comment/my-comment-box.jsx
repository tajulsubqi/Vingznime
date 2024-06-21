"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import avatar from "@/public/images/avatar.svg";
import { deleteComment, updateComment } from "@/src/actions/comment";
import { formatDate } from "@/src/libs/utils";

const MyCommentBox = ({ comment }) => {
  const router = useRouter();
  const dropdownRef = useRef(null);

  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [isPending, startTransition] = useTransition();
  const [editedComment, setEditedComment] = useState(comment.comment);

  const [rating, setRating] = useState(comment.rating);
  const [hover, setHover] = useState(null);

  const onToggleMenu = useCallback(() => {
    setDropdownVisible((prev) => !prev);
  }, []);

  useEffect(() => {
    const onClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        isDropdownVisible
      ) {
        setDropdownVisible(false);
      }

      return;
    };

    document.addEventListener("click", onClickOutside);

    return () => {
      document.removeEventListener("click", onClickOutside);
    };
  }, [isDropdownVisible]);

  const handleInput = (event) => {
    setEditedComment(event.target.value);
  };

  useEffect(() => {
    if (isEdit === false) {
      setEditedComment(comment.comment);
      setRating(comment.rating);
    }
  }, [isEdit]);

  const onDelete = () => {
    const values = { id: comment.id };

    startTransition(() => {
      deleteComment(values).then((data) => {
        if (data?.error) {
          toast.error(data.error);
        }

        if (data?.success) {
          toast.success(data.success);
        }
      });
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    //validate that the value is not empty
    if (rating < 1 || rating > 5 || editedComment === "") {
      toast.error("Please provide a rating and comments before submitting.");
      return;
    }

    // validate against spam, max 30 letters per word
    const words = editedComment.split(" ");
    const hasTooLongWord = words.some((word) => word.length > 30);

    if (hasTooLongWord) {
      toast.error(
        "The word is too long. The maximum length is 30 letters per word."
      );
      return;
    }

    // Validate total letters (max 5000)
    if (editedComment.length > 5000) {
      toast.error("Comment is too long. The maximum length is 5000 letters.");
      return;
    }

    const values = { id: comment.id, rating: rating, comment: editedComment };

    startTransition(() => {
      updateComment(values).then((data) => {
        if (data?.error) {
          toast.error(data.error);
        }

        if (data?.success) {
          toast.success(data.success);
          setIsEdit(false);
        }
      });
    });
  };

  return (
    <>
      {!isEdit ? (
        <main className="flex gap-3 border-t-2 border-Black-12 py-7 text-Absolute-White">
          <Image
            src={comment.user.image || avatar.src}
            alt=""
            width={40}
            height={40}
            className="aspect-square h-10 w-10 shrink-0 object-cover object-center rounded-full"
          />

          <section className="flex flex-col w-full ">
            <p className="leading-5">{comment.user.name}</p>

            <p className="text-xs text-Grey-60">
              {formatDate(comment.createdAt, "date")}
            </p>

            <div className="flex gap-1">
              {[...Array(5)].map((star, index) => {
                return (
                  <FaStar
                    key={index}
                    className="transition-colors w-4 h-4"
                    color={index + 1 <= comment.rating ? "#ff3333" : "#999999"}
                  />
                );
              })}
            </div>

            <p className="text-sm md:text-base">{comment.comment}</p>
          </section>

          <section
            onClick={onToggleMenu}
            className="relative inline-block cursor-pointer mr-3 rounded-full p-1 transition-colors h-fit text-Grey-60"
          >
            <HiOutlineDotsVertical size={20} />

            {isDropdownVisible && (
              <section
                ref={dropdownRef}
                className="absolute right-0 z-20 mt-3 w-36 origin-top-right rounded-lg border text-sm text-Absolute-White border-Black-15 bg-Black-10"
              >
                <div
                  onClick={() => setIsEdit(true)}
                  className="block px-4 py-2 rounded-t-lg transition-colors hover:bg-Grey-60/20"
                >
                  Edit
                </div>

                <div
                  onClick={onDelete}
                  className="block px-4 py-2 rounded-b-lg transition-colors hover:bg-Grey-60/20"
                >
                  Delete
                </div>
              </section>
            )}
          </section>
        </main>
      ) : (
        <main className="flex flex-col gap-3 mb-3">
          <section className="flex container gap-3">
            <Image
              src={comment.user.image || avatar.src}
              alt=""
              width={48}
              height={48}
              className="aspect-square h-10 w-10 md:h-12 md:w-12 shrink-0 object-cover object-center rounded-full"
            />
            <div className="flex flex-col">
              <p className="text-Absolute-White leading-none md:text-lg font-semibold tracking-wide">
                {comment.user.name}
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
            value={editedComment}
          ></textarea>

          <div className="flex gap-3">
            <button
              onClick={() => setIsEdit(false)}
              className="w-fit rounded-lg items-center px-5 py-2 bg-Grey-60/10 text-Absolute-White font-semibold hover:bg-Grey-60/20 transition-colors"
            >
              Cancel
            </button>

            <button
              disabled={isPending}
              onClick={onSubmit}
              className="w-fit rounded-lg items-center px-5 py-2 bg-Absolute-White text-Black-8 font-semibold hover:bg-opacity-75 transition-colors disabled:cursor-progress"
            >
              Submit comment
            </button>
          </div>
        </main>
      )}
    </>
  );
};

export default MyCommentBox;
