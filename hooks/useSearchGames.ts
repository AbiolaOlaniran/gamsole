// useSearchGames.ts
import { GameData } from '@/app/api/searchGames';
import { useState, useEffect } from 'react';

export function useSearchGames(searchInput: string) {
  const [searchResults, setSearchResults] = useState<GameData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchInput) {
        try {
          setIsLoading(true);
          setIsError(false);

          const response = await fetch(`/api/searchGames?searchInput=${searchInput}`);
          if (response.ok) {
            const searchData = await response.json();
            setSearchResults(searchData);
          } else {
            setIsError(true);
          }
        } catch (error) {
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSearchResults([]);
      }
    };

    fetchSearchResults();
  }, [searchInput]);

  return { searchResults, isLoading, isError };
}
