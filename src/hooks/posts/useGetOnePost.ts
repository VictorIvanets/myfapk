import { useQuery } from '@tanstack/react-query';
import { postsServices } from 'src/services/posts.services';
import { QUERY_KEY } from 'src/types/constants';

const useGetOnePost = (id: string | undefined) => {
  const { data, isError, error } = useQuery({
    queryKey: [QUERY_KEY.POST_GET_ONE, id],
    queryFn: () => postsServices.getOne(id!),
    enabled: !!id,
  });
  return {
    data,
    isError,
    error,
  };
};

export default useGetOnePost;
