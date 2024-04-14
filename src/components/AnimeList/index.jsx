import Image from "next/image"
import Link from "next/link"

const AnimeList = ({ api }) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 sm:grid-cols-3 px-4">
        {api.data?.map((anime, index) => (
          <Link
            key={index}
            href={`/anime/${anime.mal_id}`}
            className="cursor-pointer text-white hover:text-accent transition-all duration-300"
          >
            <Image
              src={anime.images.webp.large_image_url}
              alt="image"
              width={350}
              height={350}
              className="w-full h-[300px] sm:h-[400px] object-cover rounded-md object-center xl:h-[550px]"
            />
            <h3 className="font-bold text-md md:text-xl p-4 ">{anime.title}</h3>
          </Link>
        ))}
      </div>
    </>
  )
}

export default AnimeList
