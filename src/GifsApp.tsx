import { useState } from "react";
import { GifList } from "./gifs/components/GifList";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { mockGifs } from "./mock-data/gifs.mock";
import { CustomHeader } from "./shared/components/CustomHeader";
import { SearchBar } from "./shared/components/SearchBar";

export const GifsApp = () => {
  const [previousTerms, setPreviousTerms] = useState(['One Piece']);

  const handleTermClicked = (term: string) => {
    console.log({ term });
  }

  return (
    <>
      {/* Header */}
      <CustomHeader title="GIFs Search" description="Discover and share the perferct GIF" />

      {/* Search */}
      <SearchBar placeholder="Search GIFs" searchText="Search" />

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
