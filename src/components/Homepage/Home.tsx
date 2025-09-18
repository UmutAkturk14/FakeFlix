import React from "react";
import SearchBar from "./SearchBar";
import MovieCard from "./MovieCard";
import Cinema from "./Cinema";
import { searchMovies } from "../../api/apiCall";

type Movie = {
  id: string;
  title: string;
  year?: number;
  imageUrl?: string;
  cast?: string[];
  type?: string;
};

const Home: React.FC = () => {
  const [results, setResults] = React.useState<Movie[]>([]);
  const [selectedItem, setSelectedItem] = React.useState<Movie | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSearch = async (q: string) => {
    console.log("[FakeFlix] Searching for:", q);
    setLoading(true);
    setError(null);

    try {
      const response = await searchMovies(q);

      // New API: response.d is the array of results
      const movies: Movie[] = response.d.map((item) => ({
        id: item.id,
        title: item.l ?? "Untitled",
        year: item.y,
        imageUrl: item.i?.imageUrl, // adjust if image object shape differs
        cast: item.s?.split(",").map((s: string) => s.trim()) ?? [],
        type: item.qid, // "movie", "tvSeries", etc.
      }));

      setResults(movies);
    } catch (err: any) {
      console.error("Error fetching movies:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (selectedItem) {
    return (
      <Cinema
        id={selectedItem.id}
        type={selectedItem.type ?? "movie"}
        title={selectedItem.title}
        onBack={() => setSelectedItem(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-10 bg-gradient-to-b from-black/80 to-transparent py-6 px-4">
        <SearchBar onSearch={handleSearch} />
      </header>

      <main className="px-4">
        {loading && (
          <div className="mt-20 text-center text-neutral-400">Loading…</div>
        )}

        {error && <div className="mt-20 text-center text-red-500">{error}</div>}

        {!loading && !error && results.length > 0 ? (
          <section className="mt-8">
            <h2 className="text-xl font-bold mb-4">Search Results</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {results.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => setSelectedItem(movie)}
                  className="cursor-pointer"
                >
                  <MovieCard {...movie} />
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {!loading && !error && results.length === 0 && (
          <div className="mt-20 text-center text-neutral-400">
            Search for a movie or series to get started.
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
