import React from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  defaultValue?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  defaultValue = "",
}) => {
  const [value, setValue] = React.useState(defaultValue);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const submit = () => {
    const q = value.trim();
    if (!q) {
      inputRef.current?.focus();
      return;
    }
    onSearch(q);
  };

  return (
    <form
      className="w-full max-w-3xl mx-auto"
      onSubmit={(e) => {
        e.preventDefault(); // Enter key
        submit();
      }}
    >
      <div className="relative">
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search movies and series"
          aria-label="Search movies and series"
          className="w-full bg-neutral-900 text-white rounded-full py-3 pl-12 pr-28 outline-none
                     focus:ring-2 focus:ring-red-600 placeholder:text-neutral-400
                     border border-neutral-700"
        />
        {/* Search icon */}
        <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M21 21l-4.3-4.3M17 10.5A6.5 6.5 0 1 1 4 10.5a6.5 6.5 0 0 1 13 0Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-4 py-2
                     bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-medium"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
