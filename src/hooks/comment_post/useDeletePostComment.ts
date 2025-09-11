import { useMutation, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { commentPostServices } from 'src/services/comment_post.services';
import { QUERY_KEY } from 'src/types/constants';

const useDeletePostComment = (
  postId: string,
  close: (val: boolean) => void,
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: commentPostServices.deleteComment,
    onSuccess() {
      close(false);
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
    onError: error => {
      Toast.show({
        type: 'errorToast',
        text1: 'Помилка!',
        text2: error.message,
      });
    },
  });

  return {
    deleteComment: mutation.mutateAsync,
  };
};

export default useDeletePostComment;
