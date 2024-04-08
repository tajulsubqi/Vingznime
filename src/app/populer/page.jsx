"use client"
import AnimeList from "@/components/AnimeList"
import HeaderMenu from "@/components/Utilities/HeaderMenu"
import Pagination from "@/components/Utilities/Pagination"
import axiosInstance from "@/lib/axios"
import { data } from "autoprefixer"
import { useEffect, useState } from "react"

const Populer = () => {
  const [page, setPage] = useState(1)
  const [topAnime, setTopAnime] = useState([])

  const fetchPopulerAnime = async () => {
    const response = await axiosInstance(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/top/anime?page=${page}`,
    )

    setTopAnime(response.data, data)
    // console.log(response.data.data)
  }

  useEffect(() => {
    fetchPopulerAnime()
  }, [page])

  return (
    <>
      <HeaderMenu title={`Paling Populer #${page}`} />
      <AnimeList api={topAnime} />
      <Pagination
        page={page}
        lastPage={topAnime.pagination?.last_visible_page}
        setPage={setPage}
      />
    </>
  )
}

export default Populer
