import HeaderDashboard from "@/components/Dashboard/Header"
import Image from "next/image"
import Link from "next/link"
import React from "react"

const Page = () => {
  return (
    <section className="mt-4 text-primary">
      <HeaderDashboard title="My Comment" />

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 mt-4">
        <Link href="/#" className="border-2 border-accent">
          <Image src="/" alt="image" width={350} height={350} />
        </Link>
        <Link href="/#" className="border-2 border-accent">
          <Image src="/" alt="image" width={350} height={350} />
        </Link>
        <Link href="/#" className="border-2 border-accent">
          <Image src="/" alt="image" width={350} height={350} />
        </Link>
        <Link href="/#" className="border-2 border-accent">
          <Image src="/" alt="image" width={350} height={350} />
        </Link>
        <Link href="/#" className="border-2 border-accent">
          <Image src="/" alt="image" width={350} height={350} />
        </Link>
      </div>
    </section>
  )
}

export default Page
