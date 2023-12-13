import axios from "axios"

const axiosInstance = axios.create({
  base_URL: "https://api.jikan.moe/v4",
})

export default axiosInstance
