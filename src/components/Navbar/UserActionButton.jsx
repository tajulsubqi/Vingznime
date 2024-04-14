import { authUserSession } from "@/lib/auth-libs"
import Link from "next/link"

const UserActionButton = async () => {
  const user = await authUserSession()
  const actionLabel = user ? "Sign Out" : "Sign In"
  const actionURL = user ? "api/auth/signout" : "api/auth/signin"

  return (
    <div className="flex gap-4 mt-4 md:mt-0 items-center justify-between">
      {user ? (
        <Link
          href="/users/dashboard"
          className="font-semibold text-xl hover:text-slate-400 font-sans text-white duration-200 transition"
        >
          Dashboard
        </Link>
      ) : null}

      <Link
        href={actionURL}
        className="font-bold font-sans text-dark bg-primary hover:bg-slate-50 duration-300 transition px-6 py-2 rounded-full"
      >
        {actionLabel}
      </Link>
    </div>
  )
}

export default UserActionButton
