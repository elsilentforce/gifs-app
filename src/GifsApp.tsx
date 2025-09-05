import { useState } from "react";
import { GifList } from "./gifs/components/GifList";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { mockGifs } from "./mock-data/gifs.mock";
import { CustomHeader } from "./shared/components/CustomHeader";
import { SearchBar } from "./shared/components/SearchBar";

export const GifsApp = () => {
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);

  const handleTermClicked = (term: string) => {
    console.log({ term });
  };

  const handleSearch = (query: string = '') => {
    const sanitizedQuery = query.trim().toLowerCase();

    if (sanitizedQuery.length === 0) return;

    if (previousTerms.includes(sanitizedQuery)) return;

    setPreviousTerms([sanitizedQuery, ...previousTerms.slice(0, 7)]);
  };

  return (
    <>
      {/* Header */}
      <CustomHeader title="GIFs Search" description="Discover and share the perferct GIF" />

      {/* Search */}
      <SearchBar
        placeholder="Search GIFs"
        onQuery={handleSearch}
      />

      {/* Previous Searches */}
      <PreviousSearches
        title="Previous searches"
        previousSearches={previousTerms}
        onItemClicked={handleTermClicked}
      />

      {/* GIFs */}
      <GifList gifs={mockGifs} />
    </>
  );
};
