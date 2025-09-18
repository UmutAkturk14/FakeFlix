// src/api/apiCall.ts

export interface MovieResult {
  id: string; // e.g. "tt0903747"
  l: string; // title, e.g. "Breaking Bad"
  q: string; // type, e.g. "TV series"
  qid: string; // type id, e.g. "tvSeries"
  rank?: number;
  s?: string; // cast string
  y?: number; // year
  yr?: string; // year range
  i?: unknown; // image object (shape can be refined later)
}

export interface SearchResponse {
  d: MovieResult[];
  q: string;
  v: number;
}

export async function searchMovies(query: string): Promise<SearchResponse> {
  const key = import.meta.env.VITE_RAPIDAPI_KEY;

  if (!key) {
    throw new Error(
      "Missing RapidAPI key. Define VITE_RAPIDAPI_KEY in your .env file."
    );
  }

  // API expects lowercase, no spaces, and `.json` suffix
  const url = `https://imdb-movies-web-series-etc-search.p.rapidapi.com/${encodeURIComponent(
    query.toLowerCase()
  )}.json`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-key": key,
        "x-rapidapi-host": "imdb-movies-web-series-etc-search.p.rapidapi.com",
      },
    });

    if (!res.ok) {
      throw new Error(`API request failed: ${res.status} ${res.statusText}`);
    }

    const data: SearchResponse = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching movies:", err);
    throw err;
  }
}
