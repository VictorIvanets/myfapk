import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from 'src/types/constants';
import { postsServices } from 'src/services/posts.services';

const useCreatePost = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: postsServices.create,
    onError: error => {
      console.log(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.POST_GET_ALL],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.POST_GET_ALL_BY_USER],
      });
    },
  });

  return {
    create: mutation.mutate,
    isLoading: mutation.isPending,
  };
};

export default useCreatePost;
