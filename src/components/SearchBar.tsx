interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
  totalCount: number;
}

export default function SearchBar({ value, onChange, resultCount, totalCount }: SearchBarProps) {
  return (
    <div className="search-bar">
      <div className="search-bar__input-wrap">
        <svg
          className="search-bar__icon"
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search by title, URL, description or tag…"
          aria-label="Search links"
        />
        {value && (
          <button
            className="search-bar__clear"
            onClick={() => onChange('')}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>
      <span className="search-bar__count">
        {value ? `${resultCount} of ${totalCount} links` : `${totalCount} link${totalCount === 1 ? '' : 's'}`}
      </span>
    </div>
  );
}
