import Link from "next/link"
import InputSearch from "@/src/components/Navbar/InputSearch"
import UserAction from "@/src/components/Navbar/UserActionButton"

const Navbar = () => {
  return (
    <nav className="container flex flex-col items-center gap-2.5 justify-between py-7 md:flex-row md:gap-20">
      <Link href="/" className="shrink-0">
        <p className="font-bold text-Absolute-White text-2xl md:text-4xl md:h-9">
          Vingznime
        </p>
      </Link>

      <div className="flex container w-full gap-2.5 justify-between md:justify-end md:gap-5">
        <InputSearch />

        <UserAction />
      </div>
    </nav>
  )
}

export default Navbar
