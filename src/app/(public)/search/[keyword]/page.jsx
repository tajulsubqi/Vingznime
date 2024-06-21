import { getAnimeResponse } from "@/src/libs/api-libs";
import AnimeList from "@/src/components/AnimeList";
import Header from "@/src/components/AnimeList/Header";
import Navbar from "@/src/components/Navbar";

const Page = async ({ params }) => {
  const { keyword } = params;
  const decodedKeyword = decodeURI(keyword);
  const searchAnime = await getAnimeResponse(
    "anime",
    `sfw&q=${decodedKeyword}`
  );

  return (
    <main className="px-5 pb-2.5 md:pb-12">
      <Navbar />

      <section className="container ">
        <Header title={`Search Result For '${decodedKeyword}...' `} />

        {searchAnime.data?.length > 0 ? (
          <AnimeList api={searchAnime} />
        ) : (
          <div className="flex justify-center items-center h-40 text-Grey-60">
            <p className="flex justify-center items-center ">
              Anime with keyword '{decodedKeyword}' not found...
            </p>
          </div>
        )}
      </section>
    </main>
  );
};
export default Page;
