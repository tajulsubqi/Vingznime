import Image from "next/image"
import Link from "next/link"

const AnimeList = ({ api }) => {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 sm:grid-cols-3 px-4">
      {api.data.map((anime) => (
        <Link href={`/${anime.mal_id}`} className="cursor-pointer">
          <Image
            src={anime.images.webp.image_url}
            alt="image"
            width={350}
            height={350}
            className="w-full h-[300px] sm:h-[400px] object-cover object-center xl:h-[550px]"
          />
          <h3 className="font-bold text-md md:text-xl p-4 ">{anime.title}</h3>
        </Link>
      ))}
    </div>
  )
}

export default AnimeList
