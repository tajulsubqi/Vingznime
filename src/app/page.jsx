import AnimeList from "@/components/AnimeList"
import Header from "@/components/AnimeList/Header"
import { getAnimeResponse } from "@/lib/api-libs"

const Page = async () => {
  // const response = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/top/anime?limit=8`,
  // )
  // const topAnime = await response.json()
  // console.log(topAnime.data)

  const topAnime = await getAnimeResponse("top/anime", "limit=8")

  return (
    <>
      {/* anime terpopuler */}
      <section>
        <Header title="Paling Populer" linkTitle="Lihat semua" linkHref="/populer" />
        <AnimeList api={topAnime} />
      </section>
    </>
  )
}

export default Page
