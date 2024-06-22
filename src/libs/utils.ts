export const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function createQueryString(
  queries: Record<string, string | number | boolean>,
): string {
  const params = new URLSearchParams(queries as Record<string, string>)
  return params.toString()
}

export function formatScore(score: string | number): string {
  const formattedScore = parseFloat(score.toString())

  if (isNaN(formattedScore)) {
    return score.toString()
  }

  return formattedScore.toFixed(2)
}

export function formatDate(
  dateString: string | Date,
  format: "fullDate" | "year" | "date",
): string {
  const date = typeof dateString === "string" ? new Date(dateString) : dateString

  switch (format) {
    case "fullDate": {
      const formatter = new Intl.DateTimeFormat("en-GB", {
        weekday: "long",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      return formatter.format(date)
    }
    case "year":
      return date.getFullYear().toString()
    case "date": {
      const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
      return date.toLocaleDateString("en-GB", options)
    }
    default:
      throw new Error(`Invalid format: ${format}`)
  }
}
