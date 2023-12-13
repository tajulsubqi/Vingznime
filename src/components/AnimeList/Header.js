import Link from "next/link"

const Header = ({ title, linkHref, linkTitle }) => {
  return (
    <div className="flex justify-between px-2 items-center">
      <h1 className="text-2xl font-bold p-4">{title}</h1>
      {linkHref && linkTitle ? (
        <Link
          href={linkHref}
          className="text-sm md:text-lg hover:text-indigo-500 semi-font-bold underline p-4"
        >
          {linkTitle}
        </Link>
      ) : null}
    </div>
  )
}

export default Header
