import axios, { AxiosRequestConfig } from "axios"

const fetchWithTimeout = async (
  url,
  options: AxiosRequestConfig = {},
  timeout = 10000,
) => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)
  options.signal = controller.signal

  try {
    const response = await axios(url, options)
    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)
    throw error
  }
}

export default async (req, res) => {
  const { code } = req.query
  const githubAuthURL = `https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${code}`

  try {
    console.log("Fetching GitHub access token...")
    const response = await fetchWithTimeout(
      githubAuthURL,
      {
        method: "POST",
        headers: {
          accept: "application/json",
        },
      },
      10000,
    )
    const data = response.data
    console.log("GitHub access token fetched successfully")
    res.status(200).json(data)
  } catch (error) {
    console.error("Error fetching GitHub access token:", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}
