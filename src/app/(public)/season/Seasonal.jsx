"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";

import { fetcher, createQueryString } from "@/src/libs/utils";
import AnimeList from "@/src/components/AnimeList";
import Header from "@/src/components/AnimeList/Header";
import Pagination from "@/src/components/Utilities/Pagination";

const typeQuery = ["All", "TV", "Movie", "OVA", "Special", "ONA", "Music"];

const Seasonal = () => {
  const router = useRouter();
  const pathname = usePathname();
  const query = useSearchParams();
  const params = new URLSearchParams(query);

  const selectedType = query.get("type") || "All";
  const page = query.get("page") || 1;

  const [loading, setLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  //fetch data
  const { data } = useSWR(
    selectedType === "All"
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/seasons/now?sfw&page=${page}`
      : `${process.env.NEXT_PUBLIC_API_BASE_URL}/seasons/now?sfw&page=${page}&filter=${selectedType}`,
    fetcher
  );

  //loading skeleton
  useEffect(() => {
    if (data === undefined) {
      setLoading(true);
    } else {
      setLoading(false);

      if (data.data.length <= 0) {
        setIsEmpty(true);
      } else {
        setIsEmpty(false);
      }
    }
  }, [data]);

  //validasi tipe dan halaman pada url
  useEffect(() => {
    if (!typeQuery.includes(selectedType)) {
      params.set("type", "All");
      const newUrl = `${pathname}?${params.toString()}`;
      router.replace(newUrl);
    }

    if (parseInt(page) < 1) {
      params.set("page", 1);
      const newUrl = `${pathname}?${params.toString()}`;
      router.replace(newUrl);
    }

    if (parseInt(page) > data?.pagination?.last_visible_page) {
      params.set("page", data?.pagination?.last_visible_page);
      const newUrl = `${pathname}?${params.toString()}`;
      router.replace(newUrl);
    }
  }, [data]);

  return (
    <section className="container">
      <div className="flex flex-col md:items-center md:flex-row md:gap-10">
        <Header title={`Seasonal Anime #${page}`} />
        <div className="flex gap-3 overflow-x-auto mb-3 items-center ">
          {typeQuery.map((type, index) => (
            <button
              onClick={() => {
                router.push(
                  pathname +
                    "?" +
                    createQueryString({
                      page: 1,
                      type: `${type}`,
                    })
                );
              }}
              key={index}
              className={`py-1 px-5 rounded-lg text-center ${
                selectedType == type
                  ? "py-2 px-6 bg-Grey-60/10 text-Absolute-White hover:bg-Grey-60/20"
                  : "border-2 border-Grey-60/20 text-Absolute-White transition-all hover:bg-Grey-60/20 hover:border-transparent"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        Array(25)
          .fill(0)
          .map((d, i) => (
            <section
              key={i}
              className="flex flex-row mb-3 animate-pulse bg-Black-10 rounded-lg items-center "
            >
              <div className="w-auto h-auto">
                <div className="w-14 h-16 md:w-16 md:h-20 bg-Black-20 rounded-l-lg" />
              </div>

              <section className="flex flex-col gap-3 px-5 w-full">
                <div className="flex gap-3">
                  <div className="w-10 h-3 bg-Black-20 rounded-3xl" />
                  <div className="w-10 h-3 bg-Black-20 rounded-3xl" />
                  <div className="w-10 h-3 bg-Black-20 rounded-3xl" />
                </div>

                <div className="w-44 sm:w-80 h-3 bg-Black-20 rounded-3xl" />
              </section>
            </section>
          ))
      ) : (
        <>
          {isEmpty ? (
            <div className="flex justify-center items-center h-40 text-Grey-60">
              <p className="flex justify-center items-center ">
                There are no anime of this type this season..
              </p>
            </div>
          ) : (
            <>
              <AnimeList horizontal api={data} score type />
              <Pagination
                page={page}
                lastPage={data?.pagination?.last_visible_page}
              />
            </>
          )}
        </>
      )}
    </section>
  );
};

export default Seasonal;
