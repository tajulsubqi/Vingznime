"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import useSWR from "swr";
import { XCircle } from "@phosphor-icons/react";
import { fetcher } from "@/src/libs/utils";
import Header from "@/src/components/AnimeList/Header";

const Character = ({ animeId }) => {
  const [characters, setCharacters] = useState([]);

  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/anime/${animeId}/characters`,
    fetcher
  );

  useEffect(() => {
    if (data != undefined) {
      const filterCharacters = data?.data.filter((char) => char.role == "Main");
      setCharacters(filterCharacters);
    }
  }, [data]);

  const [characterId, setCharacterId] = useState(null);
  const [isCharacterDetailsVisible, setCharacterDetailsVisible] =
    useState(false);

  const { data: details } = useSWR(
    characterId
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/characters/${characterId}`
      : null,
    fetcher
  );

  function handleOpenModal(id) {
    setCharacterId(id);
    setTimeout(() => setCharacterDetailsVisible(true), 400);
  }

  function decodedText(text) {
    return text?.replaceAll(/&[a-zA-Z0-9;]+;/g, "");
  }

  return (
    <>
      {characters.length > 0 && (
        <section>
          <Header title="Main Character" />

          <div className="w-full gap-3 grid md:grid-cols-3 2xl:grid-cols-4 text-Absolute-White">
            {characters.map((char, index) => {
              return (
                <section
                  key={index}
                  onClick={() => handleOpenModal(char.character.mal_id)}
                  className="flex flex-row w-full cursor-pointer bg-Black-10 rounded-lg text-Absolute-White items-center transition-colors hover:bg-gradient-to-r from-transparent to-Red-60"
                >
                  <div className="w-auto h-auto">
                    <Image
                      unoptimized
                      src={char.character.images.webp.image_url}
                      alt={char.character.images.webp.image_url}
                      width={50.56}
                      height={67.41}
                      className="object-cover object-center rounded-l-lg aspect-[3/4]"
                    />
                  </div>

                  <section className="w-full px-5">
                    <p className="font-medium md:text-lg line-clamp-1">
                      {char.character.name}
                    </p>
                  </section>
                </section>
              );
            })}

            {/* modal details */}
            {/* backdrop */}
            <div
              onClick={() => setCharacterDetailsVisible(false)}
              className={`fixed z-10 inset-0 flex justify-center items-center transition-colors ${
                isCharacterDetailsVisible
                  ? "bg-Absolute-Black bg-opacity-75 visible"
                  : "invisible"
              }`}
            >
              {/* modal */}
              {details != undefined && (
                <section
                  onClick={(e) => e.stopPropagation()}
                  className={`overscroll-contain bg-Black-10 max-w-[90%] md:max-w-[80%] max-h-[86%] overflow-auto rounded-xl shadow p-5 transition-all duration-500 ${
                    isCharacterDetailsVisible
                      ? "scale-100 opacity-100"
                      : "scale-50 opacity-0"
                  }`}
                >
                  {/* x button */}

                  <button
                    onClick={() => setCharacterDetailsVisible(false)}
                    className="absolute top-3 right-3 text-Absolute-White"
                  >
                    <XCircle size={20} weight="fill" />
                  </button>

                  {/* character details */}

                  <article className="flex flex-col gap-7 rounded-lg md:flex-row ">
                    <div className="w-auto h-auto">
                      <Image
                        unoptimized
                        src={details?.data.images?.webp.image_url}
                        alt={details?.data.images?.webp.image_url}
                        width={384}
                        height={542}
                        className="object-cover object-center rounded-lg aspect-[3/4] w-full md:w-80"
                      />
                    </div>

                    <section className="flex flex-col gap-1.5 w-full text-base leading-7">
                      <p className="font-bold text-center text-2xl md:text-start md:text-4xl">
                        {details?.data.name}
                      </p>

                      <hr className="w-full border-t border-Absolute-White" />

                      {details?.data.about ? (
                        <p className="whitespace-pre-line">
                          {decodedText(details?.data.about)}
                        </p>
                      ) : (
                        <p className="flex text-Grey-60">
                          There is no information about this character yet...
                        </p>
                      )}
                    </section>
                  </article>
                </section>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Character;
