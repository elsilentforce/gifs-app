import { useRef, useState } from "react";
import { getGifsByQuery } from "../actions/get-gifs-by-query.actions";
import type { Gif } from "../interfaces/gif.interface";

// const gifsCache: Record<string, Gif[]> = {};

export const useGifs = () => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);
  const gifsCache = useRef<Record<string, Gif[]>>({});

  const handleTermClicked = async (term: string) => {
    if (gifsCache.current[term]) {
      setGifs(gifsCache.current[term]);
      return;
    };

    handleSearch(term);
  };

  const handleSearch = async (query: string = '') => {
    const sanitizedQuery = query.trim().toLowerCase();

    if (sanitizedQuery.length === 0) return;

    if (previousTerms.includes(sanitizedQuery)) return;

    setPreviousTerms([sanitizedQuery, ...previousTerms.slice(0, 7)]);

    const fetchedGifs = await getGifsByQuery(query);
    gifsCache.current[query] = fetchedGifs;
    setGifs(fetchedGifs);
  };

  return {
    // Values
    gifs,
    previousTerms,
    //Methods
    handleTermClicked,
    handleSearch
  }
}
