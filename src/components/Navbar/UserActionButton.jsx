import { authUserSession } from "@/lib/auth-libs"
import Link from "next/link"
import React from "react"

const UserActionButton = async () => {
  const user = await authUserSession()
  const actionLabel = user ? "Sign Out" : "Sign In"
  const actionURL = user ? "api/auth/signout" : "api/auth/signin"

  return (
    <div className="flex gap-4 mt-4 md:mt-0 items-center justify-between">
      {user ? (
        <Link
          href="users/dashboard"
          className="font-semibold text-xl hover:text-slate-600 font-sans text-black duration-300 transition"
        >
          Dashboard
        </Link>
      ) : null}

      <Link
        href={actionURL}
        className="font-semibold font-sans text-accent bg-dark hover:bg-slate-500 duration-300 transition px-12 py-2 rounded"
      >
        {actionLabel}
      </Link>
    </div>
  )
}

export default UserActionButton
