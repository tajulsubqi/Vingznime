export const fetcher = (url) => fetch(url).then((res) => res.json());

export function createQueryString(queries) {
  const params = new URLSearchParams(queries);
  return params.toString();
}

export function formatScore(score) {
  const formattedScore = parseFloat(score);

  if (isNaN(formattedScore)) {
    return score;
  }

  return formattedScore.toFixed(2);
}

export function formatDate(dateString, format) {
  const date = new Date(dateString);

  switch (format) {
    case "fullDate": {
      const formatter = new Intl.DateTimeFormat("en-GB", {
        weekday: "long",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      return formatter.format(date);
    }
    case "year":
      return date.getFullYear();
    case "date": {
      const options = { day: "2-digit", month: "2-digit", year: "numeric" };
      return date.toLocaleDateString("en-GB", options);
    }
    default:
      throw new Error(`Invalid format: ${format}`); // Handle unexpected formats
  }
}
