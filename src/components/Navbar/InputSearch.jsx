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
          className="rounded-full w-full sm:w-[450px] px-5 py-3 mt-2 sm:mt-0 text-md "
        />
        <button
          onClick={handleSearch}
          className="absolute top-3.5 end-2 sm:top-3 sm:end-3"
        >
          <MagnifyingGlass size={24} weight="bold" />
        </button>
      </div>
    </>
  )
}

export default InputSearch
