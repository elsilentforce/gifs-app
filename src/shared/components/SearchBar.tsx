import { useEffect, useState } from 'react';
import type { FC, KeyboardEvent, ChangeEvent } from 'react';

interface Props {
  placeholder?: string;
  searchText?: string;
  onQuery: (query: string) => void;
}

export const SearchBar: FC<Props> = ({ placeholder, searchText = 'Search', onQuery }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onQuery(query);
    }, 700);

    return () => {
      clearTimeout(timeoutId);
    }
  }, [query, onQuery]);

  const handleSearch = () => {
    onQuery(query);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleQueryChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>{searchText}</button>
    </div>
  );
};
