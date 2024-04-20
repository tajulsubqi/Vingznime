"use client"

const CollectionButton = ({ anime_mal_id, user_email }) => {
  const handleCollection = async (e) => {
    e.preventDefault()
    const data = { anime_mal_id, user_email }

    const response = await fetch("/api/v1/collection", {
      method: "POST",
      body: JSON.stringify(data),
    })

    const collection = await response.json()
    console.log({ collection })
  }

  return (
    <>
      <button
        onClick={handleCollection}
        className="bg-accent hover:bg-yellow-200 mt-2 duration-300 transition text-dark text-lg font-bold font-sans py-2 px-4 rounded"
      >
        Add to Collection
      </button>
    </>
  )
}

export default CollectionButton
