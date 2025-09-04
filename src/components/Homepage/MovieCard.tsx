import React from "react";

interface MovieCardProps {
  id: string;
  title: string;
  year?: number;
  imageUrl?: string;
  cast?: string[];
}

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  year,
  imageUrl,
  cast,
}) => {
  return (
    <div
      key={id}
      className="bg-neutral-900 rounded-lg overflow-hidden shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-200"
    >
      {imageUrl ? (
        <img src={imageUrl} alt={title} className="w-full h-72 object-cover" />
      ) : (
        <div className="w-full h-72 bg-neutral-800 flex items-center justify-center text-neutral-500">
          No Image
        </div>
      )}
      <div className="p-3">
        <h3 className="text-lg font-semibold">{title}</h3>
        {year && <p className="text-sm text-neutral-400">({year})</p>}
        {cast && (
          <p className="text-xs text-neutral-400 mt-1">
            Starring: {cast.join(", ")}
          </p>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
