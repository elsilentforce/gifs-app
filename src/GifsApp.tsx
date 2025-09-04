import { GifList } from "./gifs/components/GifList";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { mockGifs } from "./mock-data/gifs.mock";
import { CustomHeader } from "./shared/components/CustomHeader";
import { SearchBar } from "./shared/components/SearchBar";

export const GifsApp = () => {
  return (
    <>
      {/* Header */}
      <CustomHeader title="GIFs Search" description="Discover and share the perferct GIF" />

      {/* Search */}
      <SearchBar placeholder="Search GIFs" searchText="Search" />

      {/* Previous Searches */}
      <PreviousSearches />

      {/* GIFs */}
      <GifList gifs={mockGifs} />
    </>
  );
};
