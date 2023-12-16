import Link from "next/link"
import InputSearch from "./InputSearch"

const Navbar = () => {
  return (
    <div className="bg-accent py-4 px-10 sm:flex sm:justify-between items-center">
      <Link
        href={"/"}
        className="text-2xl font-bold text-dark uppercase hover:text-indigo-700 transition  duration-300"
      >
        AnimeList
      </Link>
      <InputSearch />
    </div>
  )
}

export default Navbar
