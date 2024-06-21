import AnimeList from "@/src/components/AnimeList";
import Header from "@/src/components/AnimeList/Header";
import { getAnimeResponse } from "@/src/libs/api-libs";
import Banner from "@/src/components/Banner";
import Navbar from "@/src/components/Navbar";

const date = new Date();
const fullDay = date.toLocaleDateString("en-US", { weekday: "long" });

const Page = async () => {
  // get schedules
  const schedules = await getAnimeResponse(
    "schedules",
    `filter=${fullDay}&sfw=true`
  );

  // get seasonal anime
  const season = await getAnimeResponse("seasons/now", "sfw&limit=14");

  // get top anime
  const topAnime = await getAnimeResponse("top/anime", "sfw&limit=14");

  return (
    <main className="px-5 pb-2.5 md:pb-12">
      <Navbar />

      <article className="container flex flex-col gap-14">
        <Banner />

        <section className="flex flex-col gap-7 xl:flex-row">
          <div className="flex flex-col gap-7 md:gap-14">
            <section className="flex flex-col">
              <Header title="Seasonal Anime Series" link="/season" />

              <AnimeList api={season} />
            </section>

            <section className="flex flex-col">
              <Header title="Most Popular" link="/populer" />

              <AnimeList api={topAnime} />
            </section>
          </div>

          <section className="flex flex-col">
            <Header title="Airing Today" />

            <AnimeList horizontal api={schedules} className="xl:w-80" />
          </section>
        </section>
      </article>
    </main>
  );
};
export default Page;
