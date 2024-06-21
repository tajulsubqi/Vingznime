export const getAnimeResponse = async (resource, query) => {
  let response;
  let anime;

  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/${resource}?${query}`
      );

      if (response.status === 404) {
        anime = await response.json();
        break;
      }

      if (response.ok) {
        anime = await response.json();

        break; // Fetch berhasil, keluar dari loop
      } else if (response.status === 429) {
        const delay = Math.min(5000, 1000 * Math.pow(2, attempt - 1)); // Delay meningkat secara eksponensial

        console.warn(`API rate limit reached. Retrying in ${delay}ms...`);

        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        throw new Error(`API request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error(`API request failed: ${error.message}`);
    }
  }

  if (!anime) {
    throw new Error("Failed to fetch anime data after 5 attempts.");
  }

  return anime;
};

export const getNestedAnimeResponse = async (resource, objectProperty) => {
  const response = await getAnimeResponse(resource);
  const data = await response.data?.flatMap((item) => item[objectProperty]);
  return data;
};

export const reproduce = (data, gap) => {
  const first = ~~(Math.random() * (data.length - gap) + 1);
  const last = first + gap;

  const response = {
    data: data.slice(first, last),
  };

  return response;
};
