import Link from "next/link"
import InputSearch from "./InputSearch"
import UserActionButton from "./UserActionButton"

const Navbar = () => {
  return (
    <div className="bg-dark py-6 px-10 sm:flex sm:justify-between items-center sticky top-0 z-50 border-b border-slate-900">
      <Link href={"/"}>
        <h1
          className="text-4xl text-white hover:text-slate-500 transition duration-200 font-sans font-bold"
          style={{ textShadow: "1px 1px 1px black" }}
        >
          Vingz_Otaku
        </h1>
      </Link>

      <div className="md:flex gap-4">
        <InputSearch />
        <UserActionButton />
      </div>
    </div>
  )
}

export default Navbar
