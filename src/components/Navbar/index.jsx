import Link from "next/link"
import InputSearch from "./InputSearch"
import UserActionButton from "./UserActionButton"

const Navbar = () => {
  return (
    <div className="bg-accent py-4 px-10 sm:flex sm:justify-between items-center sticky top-0 z-50 border-b border-slate-900">
      <Link href={"/"}>
        <h1
          className="text-3xl text-dark hover:text-slate-500 transition duration-200 font-sans font-bold"
          style={{ textShadow: "1px 1px 1px black" }}
        >
          Vingz_Otaku
        </h1>
      </Link>

      <InputSearch />

    <UserActionButton/>
    </div>
  )
}

export default Navbar
