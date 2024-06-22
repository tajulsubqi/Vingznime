import { Star } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import { formatScore, formatDate } from "@/src/libs/utils";

const AnimeList = ({ api, horizontal, className, score, type }) => {
  const cardVertical = (
    <div className="grid gap-x-3 gap-y-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
      {api?.data?.map((anime, index) => {
        return (
          <Link
            href={`/anime/${anime.mal_id}`}
            key={index}
            className="flex flex-col gap-2 cursor-pointer text-Absolute-White transition-all hover:text-Red-60"
          >
            <div className="w-auto h-auto">
              <Image
                unoptimized
                priority
                src={anime.images.webp.image_url}
                alt={anime.images.jpg.image_url}
                width={256}
                height={256}
                className="object-cover object-center rounded-lg aspect-[3/4]"
              />
            </div>

            <div className="flex flex-col gap-1">
              {anime && (
                <div className="flex gap-3 justify-between items-center text-xs text-Grey-60">
                  {anime.score ? (
                    <div className="flex items-center">
                      <Star size={14} className="mr-1" />

                      <p>{formatScore(anime.score)}</p>
                    </div>
                  ) : (
                    <p></p>
                  )}

                  {anime.type && <p>{anime.type}</p>}
                </div>
              )}

              <p className="font-medium text-base leading-5 md:text-lg md:leading-6 line-clamp-2">
                {anime.title}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );

  const cardHorizontal = (
    <div className={`h-max w-full shrink-0 flex flex-col gap-3 ${className}`}>
      {api?.data?.map((anime, index) => {
        return (
          <Link
            key={index}
            href={`/anime/${anime.mal_id}`}
            className="flex flex-row cursor-pointer bg-Black-10 rounded-lg text-Absolute-White items-center transition hover:bg-gradient-to-r from-transparent to-Red-60"
          >
            <div className="w-auto h-auto">
              <Image
                unoptimized
                priority
                src={anime.images.webp.large_image_url}
                alt={anime.images.jpg.large_image_url}
                width={64}
                height={100}
                className="object-cover object-center rounded-l-lg aspect-[3/4] "
              />
            </div>

            <section className="flex flex-col px-5 w-full">
              <div className="flex gap-3 text-sm text-Grey-60 items-center">
                {score && anime.score != 0.0 && anime.score !== null && (
                  <div className="flex items-center">
                    <Star size={14} className="mr-1" />

                    <p>{formatScore(anime.score)}</p>
                  </div>
                )}

                {type && <p>{anime.type}</p>}
                {anime.aired && <p>{formatDate(anime.aired.from, "year")}</p>}
              </div>

              <p className="font-medium md:text-lg line-clamp-1">
                {anime.title}
              </p>
            </section>
          </Link>
        );
      })}
    </div>
  );
  return <>{horizontal ? cardHorizontal : cardVertical}</>;
};

export default AnimeList;
