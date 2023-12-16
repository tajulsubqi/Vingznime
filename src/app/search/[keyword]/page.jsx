import AnimeList from "@/components/AnimeList"
import Header from "@/components/AnimeList/Header"

const Page = async ({ params }) => {
  // const keyword = params.keyword
  const { keyword } = params

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/anime?q=${keyword}`,
  )
  const searchAnime = await response.json()

  return (
    <>
      <section>
        <Header title={`pencarian anime ${keyword}`} />
        <AnimeList api={searchAnime} />
      </section>
    </>
  )
}

export default Page
