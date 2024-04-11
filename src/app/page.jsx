import AnimeList from "@/components/AnimeList"
import Header from "@/components/AnimeList/Header"
import { getAnimeResponse, getNestedAnimeResponse } from "@/lib/api-libs"

const Page = async () => {
  // const response = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/top/anime?limit=8`,
  // )
  // const topAnime = await response.json()

  const topAnime = await getAnimeResponse("top/anime", "limit=8")
  let recommendedAnime = await getNestedAnimeResponse("recommendations/anime", "entry")

  // Acak urutan data rekomendasi
  recommendedAnime = recommendedAnime.sort(() => Math.random() - 0.5)

  // Ambil 4 elemen pertama setelah diacak
  recommendedAnime = { data: recommendedAnime.slice(0, 10) }

  return (
    <>
      <section>
        <Header title="Paling Populer" linkTitle="Lihat semua" linkHref="/populer" />
        <AnimeList api={topAnime} />
      </section>

      <section className="mt-3">
        <Header title="Rekomendasi" />
        <AnimeList api={recommendedAnime} />
      </section>
    </>
  )
}

export default Page
