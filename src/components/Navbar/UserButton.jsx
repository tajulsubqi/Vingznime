"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useCurrentUser } from "@/hooks/use-current-user"
import { logout } from "@/src/actions/logout"
import avatar from "@/public/images/avatar.svg"
import { RiLogoutCircleLine } from "react-icons/ri"

const UserButton = () => {
  const user = useCurrentUser()

  const dropdownRef = useRef(null)
  const [isDropdownVisible, setDropdownVisible] = useState(false)

  const onToggleMenu = useCallback(() => {
    setDropdownVisible((prev) => !prev)
  }, [])

  useEffect(() => {
    const onClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        isDropdownVisible
      ) {
        setDropdownVisible(false)
      }

      return
    }

    document.addEventListener("click", onClickOutside)

    return () => {
      document.removeEventListener("click", onClickOutside)
    }
  }, [isDropdownVisible])

  return (
    <div className="relative inline-block text-left text-Absolute-White">
      <Image
        src={user.image || avatar.src}
        alt="profile image"
        width={40}
        height={40}
        onClick={onToggleMenu}
        className="aspect-square h-10 w-10 shrink-0 object-cover object-center rounded-lg cursor-pointer md:rounded-full"
      />

      {isDropdownVisible && (
        <div
          ref={dropdownRef}
          className="absolute right-0 z-50 mt-3 w-44 origin-top-right rounded-lg border text-sm border-Black-15 bg-Black-10"
        >
          <Link
            href="/"
            className="block px-4 py-2 rounded-t-lg transition-colors hover:bg-Grey-60/20"
          >
            Home
          </Link>

          <Link
            href="/users"
            className="block px-4 py-2 transition-colors hover:bg-Grey-60/20"
          >
            Profile
          </Link>

          <button
            onClick={() => logout()}
            className="text-Red-60 flex items-center gap-x-1 w-full rounded-b-lg px-4 py-2 text-start  font-medium transition-colors hover:text-Red-60 hover:bg-Grey-60/20"
          >
            <RiLogoutCircleLine />
            Sign out
          </button>
        </div>
      )}
    </div>
  )
}

export default UserButton
