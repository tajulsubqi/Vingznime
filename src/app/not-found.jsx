"use client"

import { FileSearch } from "@phosphor-icons/react/dist/ssr"
import { useRouter } from "next/navigation"
import React from "react"

const NotFound = () => {
  const router = useRouter()

  return (
    <div className="min-h-screen flex justify-center items-center flex-col gap-3">
      <FileSearch size={45} className="text-accent " />
      <div className="text-4xl text-accent font-bold uppercase">Not Found</div>
      <button
        onClick={() => router.back()}
        className="text-white underline hover:text-accent duration-300 transition"
      >
        kembali
      </button>
    </div>
  )
}

export default NotFound
