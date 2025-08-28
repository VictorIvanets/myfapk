import { useInfiniteQuery } from '@tanstack/react-query';
import { QUERY_KEY } from 'src/types/constants';
import { useState } from 'react';
import { useDebounce } from '../useDebounce';
import { postsServices } from 'src/services/posts.services';
import type { PostT } from 'src/types/posts.types';

const useGetAllPostByUser = () => {
  const [valueDescription, setValueDescription] = useState<string>();
  const debounceDescription = useDebounce(valueDescription, 500);

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
    queryKey: [QUERY_KEY.POST_GET_ALL_BY_USER, debounceDescription],
    queryFn: ({ pageParam }) =>
      postsServices.getAllByUser(
        pageParam as string | undefined,
        debounceDescription,
      ),
    getNextPageParam: (lastPage: {
      data: PostT[];
      nextCursor: string | null;
    }) => lastPage.nextCursor ?? undefined,
    initialPageParam: undefined,
  });

  const postsByUser = data?.pages.flatMap(page => page.data) || [];

  return {
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    postsByUser,
    isRefetching,
    refetchData: refetch,
    valueDescription,
    setValueDescription,
  };
};

export default useGetAllPostByUser;
