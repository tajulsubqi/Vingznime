"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createQueryString } from "@/src/libs/utils";

import {
  CaretDoubleLeft,
  CaretDoubleRight,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react";

const Pagination = ({ page, lastPage }) => {
  const router = useRouter();
  const pathname = usePathname();
  const query = useSearchParams();

  const selectedType = query.get("type") || "All";

  return (
    <div className="flex justify-center pt-7 font-semibold text-lg text-Absolute-White">
      <div className="grid grid-cols-3 gap-3 items-center">
        {page <= 1 ? null : (
          <div className="flex gap-3">
            <span
              onClick={() => {
                router.push(
                  pathname +
                    "?" +
                    createQueryString({
                      page: 1,
                      type: selectedType,
                    })
                );
              }}
              className="cursor-pointer rounded-lg p-3 bg-Black-10 hover:bg-Black-15"
            >
              <CaretDoubleLeft size={20} weight="duotone" />
            </span>

            <span
              onClick={() => {
                router.push(
                  pathname +
                    "?" +
                    createQueryString({
                      page: parseInt(page) - 1,
                      type: selectedType,
                    })
                );
              }}
              className="cursor-pointer rounded-lg p-3 bg-Black-10 hover:bg-Black-15"
            >
              <CaretLeft size={20} weight="duotone" />
            </span>
          </div>
        )}

        <p
          className={`${
            page <= 1 || page >= lastPage ? "col-start-2" : ""
          } text-center`}
        >
          {page} of {lastPage}
        </p>

        {page >= lastPage ? null : (
          <div className="flex gap-3">
            <span
              onClick={() => {
                router.push(
                  pathname +
                    "?" +
                    createQueryString({
                      page: parseInt(page) + 1,
                      type: selectedType,
                    })
                );
              }}
              className="cursor-pointer rounded-lg p-3 bg-Black-10 hover:bg-Black-15"
            >
              <CaretRight size={20} weight="duotone" />
            </span>

            <span
              onClick={() => {
                router.push(
                  pathname +
                    "?" +
                    createQueryString({
                      page: lastPage,
                      type: selectedType,
                    })
                );
              }}
              className="cursor-pointer rounded-lg p-3 bg-Black-10 hover:bg-Black-15"
            >
              <CaretDoubleRight size={20} weight="duotone" />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pagination;
