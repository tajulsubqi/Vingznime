"use client"

import { MagnifyingGlass } from "@phosphor-icons/react"
import { useRouter } from "next/navigation"
import { useRef } from "react"

const InputSearch = () => {
  const searchRef = useRef()
  const router = useRouter()

  const handleSearch = (e) => {
    const keyword = searchRef.current.value

    // filter non-alphanumeric
    const regex = /[^\w\s]/gi
    const alphanumeric = keyword.replace(regex, "")

    if (!alphanumeric || alphanumeric.trim() == "") return

    if (e.key === "Enter" || e.type === "click") {
      e.preventDefault()

      router.push(`/search/${alphanumeric}`)
    }
  }

  return (
    <div className="relative flex-1 w-full rounded-lg md:flex-initial md:w-1/3 md:rounded-3xl">
      <input
        ref={searchRef}
        placeholder="search.."
        className="w-full p-2 px-4 rounded-lg md:rounded-3xl bg-Absolute-White"
        onKeyDown={handleSearch}
      />
      <button
        onClick={handleSearch}
        className="absolute top-2 end-2 pl-1 text-Black-8 bg-Absolute-White"
      >
        <MagnifyingGlass size={24} />
      </button>
    </div>
  )
}

export default InputSearch
