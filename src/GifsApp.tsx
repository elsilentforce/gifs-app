import { GifList } from "./gifs/components/GifList";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { CustomHeader } from "./shared/components/CustomHeader";
import { SearchBar } from "./shared/components/SearchBar";
import { useGifs } from "./gifs/hooks/useGifs";

export const GifsApp = () => {
  const { gifs, previousTerms, handleSearch, handleTermClicked } = useGifs();

  return (
    <>
      {/* Header */}
      <CustomHeader
        title="GIFs Search"
        description="Discover and share the perfect GIF"
      />

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
      <GifList gifs={gifs} />
    </>
  );
};
