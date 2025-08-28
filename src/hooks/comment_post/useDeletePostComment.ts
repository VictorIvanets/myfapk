import { useMutation, useQueryClient } from '@tanstack/react-query';
import { commentPostServices } from 'src/services/comment_post.services';
import { QUERY_KEY } from 'src/types/constants';

const useDeletePostComment = (postId: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: commentPostServices.deleteComment,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.POST_COMMENTS_GET_ALL_BY_POST, postId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.POST_GET_ONE, postId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.POST_GET_ALL],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.POST_GET_ALL_BY_USER],
      });
    },
  });

  return {
    deleteComment: mutation.mutateAsync,
  };
};

export default useDeletePostComment;
