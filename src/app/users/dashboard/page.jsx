import { authUserSession } from "@/lib/auth-libs"
import Image from "next/image"
import Link from "next/link"
import React from "react"

const Page = async () => {
  const user = await authUserSession()

  return (
    <div className="flex justify-center flex-col items-center gap-2 text-primary mt-8">
      <h5 className="text-2xl font-bold">Hello, {user.name}</h5>
      <Image
        src={user.image}
        alt={user.name}
        width={250}
        height={250}
        className="rounded-full aspect-square object-cover"
      />

      <div className="mt-5 flex flex-wrap justify-center gap-3">
        <Link
          href="/users/dashboard/collection"
          className="text-xl bg-accent hover:bg-yellow-300 duration-200 transition px-4 py-2 rounded text-dark font-bold font-sans"
        >
          My Collection
        </Link>
        <Link
          href="/users/dashboard/comment"
          className="text-xl bg-accent hover:bg-yellow-300 duration-200 transition px-4 py-2 rounded text-dark font-bold font-sans"
        >
          My Comment
        </Link>
      </div>
    </div>
  )
}

export default Page
