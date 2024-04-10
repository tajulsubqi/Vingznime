import axiosInstance from "./axios"

export const getAnimeResponse = async (resource, query) => {
  const response = await axiosInstance.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/${resource}?${query}`,
  )
  return response.data
}
