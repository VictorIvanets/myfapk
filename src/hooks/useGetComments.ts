import { useQuery, useQueryClient } from '@tanstack/react-query';
import { commentsServices } from 'src/services/comments.services';
import { QUERY_KEY } from 'src/types/constants';

const useGetCommens = (id: string | undefined) => {
  const queryClient = useQueryClient();

  const { data, isError, error, isLoading, refetch } = useQuery({
    queryKey: [QUERY_KEY.GET_COMMENTS, id],
    queryFn: () => commentsServices.getAllByFishingId(id!),
    enabled: !!id,
  });

  const refetchFn = () => {
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEY.LOAD_PHOTO, id],
    });
    refetch();
  };

  return {
    comments: data ? data : [],
    isError,
    error,
    isLoading,
    refetch: refetchFn,
  };
};

export default useGetCommens;
