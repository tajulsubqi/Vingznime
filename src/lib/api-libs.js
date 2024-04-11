import axiosInstance from "./axios"

export const getAnimeResponse = async (resource, query) => {
  const response = await axiosInstance.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/${resource}?${query}`,
  )
  return response.data
}

export const getNestedAnimeResponse = async (resource, objectProperty) => {
  const response = await getAnimeResponse(resource)
  return response.data.flatMap((item) => item[objectProperty])
}

// export const getNestedAnimeResponse = async (resource) => {
//   const response = await fetch(resource)
// }
