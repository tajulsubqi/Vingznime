import React from "react"

const Pagination = ({ page, lastPage, setPage }) => {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const handleNextPage = () => {
    setPage((prev) => prev + 1)
    scrollTop()
  }

  const handlePrevPage = () => {
    setPage((prev) => prev - 1)
    if (page === 1) return setPage(1)
    scrollTop()
  }

  return (
    <div className="flex justify-center items-center py-4 px-2 gap-4 text-primary text-xl">
      {page <= 1 ? null : (
        <button onClick={handlePrevPage} className="transition hover:text-accent">
          Prev
        </button>
      )}

      <p>
        {page} 0f {lastPage}
      </p>

      {page >= lastPage ? null : (
        <button onClick={handleNextPage} className="transition hover:text-accent">
          Next
        </button>
      )}
    </div>
  )
}

export default Pagination
