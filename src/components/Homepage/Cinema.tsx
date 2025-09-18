import React from "react";

interface CinemaProps {
  id: string;
  type: "movie" | "tv" | string;
  title: string;
  onBack: () => void;
}

const Cinema: React.FC<CinemaProps> = ({ id, type, title, onBack }) => {
  const [season, setSeason] = React.useState<number>(1);
  const [episode, setEpisode] = React.useState<number>(1);

  const movieBase = import.meta.env.VITE_MOVIE_EMBED_URL;
  const tvBase = import.meta.env.VITE_TV_EMBED_URL;

  let src = "";
  if (type === "movie") {
    src = `${movieBase}${id}`;
  } else if (type === "tv" || type === "series") {
    src = `${tvBase}${id}/${season}/${episode}`;
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <button
        onClick={onBack}
        className="mb-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
      >
        ⬅ Back
      </button>

      <h2 className="text-2xl font-bold mb-4">{title}</h2>

      {type === "movie" ? (
        <iframe
          src={`${movieBase}${id}`}
          className="w-full aspect-video rounded-lg border border-neutral-800"
          allowFullScreen
        />
      ) : (
        <div>
          <div className="flex gap-4 mb-4">
            <input
              type="number"
              min={1}
              value={season}
              onChange={(e) => setSeason(Number(e.target.value))}
              className="w-24 px-2 py-1 rounded bg-neutral-900 border border-neutral-700 text-white"
              placeholder="Season"
            />
            <input
              type="number"
              min={1}
              value={episode}
              onChange={(e) => setEpisode(Number(e.target.value))}
              className="w-24 px-2 py-1 rounded bg-neutral-900 border border-neutral-700 text-white"
              placeholder="Episode"
            />
          </div>
          <iframe
            src={`${tvBase}${id}/${season}/${episode}`}
            className="w-full aspect-video rounded-lg border border-neutral-800"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
};

export default Cinema;
