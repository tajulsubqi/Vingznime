"use client"
import CollectionButton from "@/components/Utilities/CollectionButton"
import VideoPlayer from "@/components/Utilities/VideoPalyer"
import { getAnimeResponse } from "@/lib/api-libs"
import { authUserSession } from "@/lib/auth-libs"
import Image from "next/image"

const Page = async ({ params: { id } }) => {
  const anime = await getAnimeResponse(`anime/${id}`)
  const user = await authUserSession()

  return (
    <>
      <div className="pt-4 px-4">
        <h3 className="text-2xl font-semibold text-accent">
          {anime.data?.title} - {anime.data?.year}
        </h3>
        {/* <CollectionButton anime_mal_id={id} user_email={user?.email} /> */}
        <CollectionButton />
      </div>

      <div className="pt-4 mx-4 flex gap-2 text-primary overflow-x-auto">
        <div className="w-36 flex flex-col justify-center items-center rounded border border-primary p-2">
          <h3>Rank : {anime.data?.rank}</h3>
        </div>
        <div className="w-36 flex flex-col justify-center items-center rounded border border-primary p-2">
          <h3>Score : {anime.data?.score}</h3>
        </div>
        <div className="w-36 flex flex-col justify-center items-center rounded border border-primary p-2">
          <h3>Members : {anime.data?.members}</h3>
        </div>
        <div className="w-36 flex flex-col justify-center items-center rounded border border-primary p-2">
          <h3>Episode : {anime.data?.episodes}</h3>
        </div>
      </div>

      <div className="mt-4 mx-4 flex sm:flex-nowrap flex-wrap gap-2 text-primary pb-4">
        <Image
          src={anime.data?.images.webp.large_image_url}
          alt={anime.data?.images.jpg.image_url}
          width={250}
          height={250}
          className="w-full md:w-1/3 rounded object-cover"
        />
        <div className="md:w-full md:text-lg text-justify md:ms-3">
          <h2 className="text-2xl font-bold mt-2">{anime.data?.title_japanese}</h2>
          <p className="mt-2">{anime.data?.synopsis}</p>

          <div className="mt-2">
            <h2 className="font-semibold mb-1">Genres :</h2>
            {anime.data?.genres.map((genre) => (
              <div
                key={genre.mal_id}
                className="inline-block text-slate-600 bg-primary rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
              >
                <p>{genre.name}</p>
              </div>
            ))}
          </div>

          <div className="mt-2">
            <h2 className="font-semibold mb-1">Studios :</h2>
            {anime.data?.studios.map((studio) => (
              <div
                key={studio.mal_id}
                className="inline-block text-slate-600 bg-primary rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
              >
                <p>{studio.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <VideoPlayer youtubeId={anime.data?.trailer.youtube_id} />
      </div>
    </>
  )
}

export default Page
