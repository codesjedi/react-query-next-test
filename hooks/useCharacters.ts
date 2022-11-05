import { useQuery } from '@tanstack/react-query';

import { apiClient } from '../config/axios.config';
import { Character } from '../types';

async function getCharacters(page: number) {
  try {
    const response = await apiClient(`/people?page=${page}`);
    const { results, next } = await response.data;
    return {
      results,
      isMore: next,
    };
  } catch (error) {
    throw new Error();
  }
}

async function getCharacter(id: string) {
  try {
    const response = await apiClient(`/people/${id}`);
    return response.data;
  } catch (error) {
    throw new Error();
  }
}

export function useCharacter(id: string) {
  const {
    data: character,
    isLoading: characterLoading,
    isError: characterError,
    refetch: characterRefetch,
  } = useQuery<Character>({
    queryKey: ['character', id],
    queryFn: () => getCharacter(id),
    keepPreviousData: true,
    retry: false,
  });
  return {
    character,
    characterLoading,
    characterError,
    characterRefetch,
  };
}

export function useCharacters(page: number) {
  const {
    data: characters,
    isLoading: charactersLoading,
    isFetching: charactersFetching,
    isError: charactersError,
    refetch: charactersRefetch,
  } = useQuery<{ isMore: boolean; results: Character[] }>({
    queryKey: ['characters', page],
    queryFn: () => getCharacters(page),
    keepPreviousData: true,
    retry: false,
    staleTime: 60 * 60 * 1000,
  });

  return {
    characters: characters?.results,
    isMoreCharacters: characters?.isMore,
    charactersLoading,
    charactersFetching,
    charactersError,
    charactersRefetch,
  };
}
