"use client"

import { MagnifyingGlass } from "@phosphor-icons/react"
import { useRouter } from "next/navigation"
import { useRef } from "react"

const InputSearch = () => {
  const searchHref = useRef()
  const router = useRouter()

  const handleSearch = (event) => {
    event.preventDefault()

    const keyword = searchHref.current.value.trim()
    if (keyword) {
      router.push(`/search/${keyword}`)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(e)
    }
  }

  return (
    <>
      <div className="relative">
        <input
          type="text"
          placeholder="search anime ..."
          ref={searchHref}
          onKeyDown={handleKeyPress}
          className="rounded-md w-full sm:w-[250px] px-2 py-2 mt-2 sm:mt-0 text-sm "
        />
        <button
          onClick={handleSearch}
          className="absolute top-3.5 end-2 sm:top-1.5 sm:end-2"
        >
          <MagnifyingGlass size={24} />
        </button>
      </div>
    </>
  )
}

export default InputSearch
