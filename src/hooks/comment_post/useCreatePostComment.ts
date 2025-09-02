import { useMutation, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { commentPostServices } from 'src/services/comment_post.services';
import { QUERY_KEY } from 'src/types/constants';
import type { CommentPostPayloadT } from 'src/types/posts.types';

const useCreatePostComment = () => {
  const mutation = useMutation({
    mutationFn: commentPostServices.create,
    onError: error => {
      Toast.show({
        type: 'errorToast',
        text1: 'Помилка!',
        text2: error.message,
      });
    },
  });
  const queryClient = useQueryClient();
  const { mutate, isPending } = mutation;

  const create = (payload: CommentPostPayloadT) => {
    mutate(payload, {
      onSuccess() {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.POST_COMMENTS_GET_ALL_BY_POST, payload.postId],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.POST_GET_ONE, payload.postId],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.POST_GET_ALL],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.POST_GET_ALL_BY_USER],
        });
      },
    });
  };
  return {
    create,
    isLoading: isPending,
  };
};

export default useCreatePostComment;
