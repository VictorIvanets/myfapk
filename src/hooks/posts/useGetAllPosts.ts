import { useInfiniteQuery } from '@tanstack/react-query';
import { QUERY_KEY } from 'src/types/constants';
import { useState } from 'react';
import { useDebounce } from '../useDebounce';
import { postsServices } from 'src/services/posts.services';
import type { PostT } from 'src/types/posts.types';

const useGetAllPost = () => {
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
    queryKey: [QUERY_KEY.POST_GET_ALL, debounceDescription],
    queryFn: ({ pageParam }) =>
      postsServices.getAll(
        pageParam as string | undefined,
        debounceDescription,
      ),
    getNextPageParam: (lastPage: {
      data: PostT[];
      nextCursor: string | null;
    }) => lastPage.nextCursor ?? undefined,
    initialPageParam: undefined,
  });

  const posts = data?.pages.flatMap(page => page.data) || [];

  return {
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    posts,
    isRefetching,
    refetchData: refetch,
    valueDescription,
    setValueDescription,
  };
};

export default useGetAllPost;
