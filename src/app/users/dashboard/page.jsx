import { authUserSession } from "@/lib/auth-libs"
import Image from "next/image"
import React from "react"

const Page = async () => {
  const user = await authUserSession()

  return (
    <div className="text-primary">
      <h1>Dashboard</h1>
      <p>Hello, {user.name}</p>
      <Image src={user.image} alt={user.name} width={250} height={250} />
    </div>
  )
}

export default Page
