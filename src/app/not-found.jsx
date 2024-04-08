import { FileSearch } from "@phosphor-icons/react/dist/ssr"
import Link from "next/link"
import React from "react"

const NotFound = () => {
  return (
    <div className="min-h-screen flex justify-center items-center flex-col gap-3">
      <FileSearch size={45} className="text-accent " />
      <div className="text-4xl text-accent font-bold uppercase">Not Found</div>
      <Link href={"/"}>
        <button className="text-white underline hover:text-accent duration-300 transition">
          kembali
        </button>
      </Link>
    </div>
  )
}

export default NotFound
