import Link from "next/link"

const Header = ({ title, linkHref, linkTitle }) => {
  return (
    <div className="flex justify-between mx-4 items-center">
      <h1 className="text-2xl text-white font-bold font-sans p-4">{title}</h1>
      {linkHref && linkTitle ? (
        <Link
          href={linkHref}
          className="text-sm md:text-lg bg-slate-800 rounded-full text-white hover:text-accent transition duration-300 px-3 py-1"
        >
          {linkTitle}
        </Link>
      ) : null}
    </div>
  )
}

export default Header
