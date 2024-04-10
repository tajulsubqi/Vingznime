"use client"
import VideoPlayer from "@/components/Utilities/VideoPalyer"
import { getAnimeResponse } from "@/lib/api-libs"
import Image from "next/image"

const Page = async ({ params: { id } }) => {
  const anime = await getAnimeResponse(`anime/${id}`)

  return (
    <>
      <div className="pt-4 px-4">
        <h3 className="text-2xl font-semibold text-primary">
          {anime.data?.title} - {anime.data?.year}
        </h3>
      </div>

      <div className="pt-4 flex gap-2 text-primary overflow-x-auto">
        <div className="w-36 flex flex-col justify-center items-center rounded border border-primary p-2">
          <h3>Rating : {anime.data?.rank}</h3>
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
        <p className="md:w-full text-justify md:text-xl md:ms-3">
          {anime.data?.synopsis}
        </p>
      </div>

      <div>
        <VideoPlayer youtubeId={anime.data?.trailer.youtube_id} />
      </div>
    </>
  )
}

export default Page
