import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { fishingServices } from 'src/services/fishing.services';
import { QUERY_KEY } from 'src/types/constants';
import type { OneFishingT } from 'src/types/fishing';
import { useDebounce } from './useDebounce';

const useGetAll = () => {
  const [value, setValue] = useState<string>();
  const debounceTitle = useDebounce(value, 500);

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
    refetch,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEY.ALL_FISH, debounceTitle],
    queryFn: ({ pageParam }) =>
      fishingServices.getAll(pageParam as string | undefined, debounceTitle),
    getNextPageParam: (lastPage: {
      data: OneFishingT[];
      nextCursor: string | null;
    }) => lastPage.nextCursor ?? undefined,
    initialPageParam: undefined,
  });

  const allItems = data?.pages.flatMap(page => page.data) || [];

  return {
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    allItems,
    isRefetching,
    refetchData: refetch,
    value,
    setValue,
  };
};

export default useGetAll;
