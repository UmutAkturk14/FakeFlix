// src/api/apiCall.ts
export interface SearchResult {
  // shape will be refined once we see the sample response
  [key: string]: unknown;
}

export async function searchMovies(query: string): Promise<SearchResult> {
  const key = import.meta.env.VITE_RAPIDAPI_KEY;

  console.log(key);

  if (!key) {
    throw new Error(
      "Missing RapidAPI key. Define VITE_RAPIDAPI_KEY in your .env file."
    );
  }

  const url = `https://imdb-com.p.rapidapi.com/search?searchTerm=${encodeURIComponent(query)}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-key": key,
        "x-rapidapi-host": "imdb-com.p.rapidapi.com",
      },
    });

    if (!res.ok) {
      throw new Error(`API request failed: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching movies:", err);
    throw err;
  }
}
