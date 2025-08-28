import { useQuery } from '@tanstack/react-query';
import { commentPostServices } from 'src/services/comment_post.services';
import { QUERY_KEY } from 'src/types/constants';

const useGetPostComments = (id: string | undefined) => {
  const { data, isError, error, isLoading, refetch } = useQuery({
    queryKey: [QUERY_KEY.POST_COMMENTS_GET_ALL_BY_POST, id],
    queryFn: () => commentPostServices.getAllByPostId(id!),
    enabled: !!id,
  });

  return {
    comments: data ? data : [],
    isError,
    error,
    isLoading,
    refetch,
  };
};

export default useGetPostComments;
