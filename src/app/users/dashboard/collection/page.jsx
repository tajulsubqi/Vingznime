import HeaderDashboard from "@/components/Dashboard/Header"
import Image from "next/image"
import Link from "next/link"
import React from "react"

const Page = () => {
  return (
    <section className="mt-4 mx-4 text-primary">
      <HeaderDashboard title="My Collection" />

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 mt-3">
        <Link href="/#" className="relative border-2 border-accent rounded">
          <Image src="/" alt="image" width={350} height={350} />
          <div className="absolute w-full flex justify-center items-center bottom-0 bg-accent h-14">
            <h5 className="text-dark font-bold">Judul Anime</h5>
          </div>
        </Link>
      </div>
    </section>
  )
}

export default Page
