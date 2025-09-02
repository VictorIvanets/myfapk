import { useMutation, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { commentsServices } from 'src/services/comments.services';
import type { CommentT } from 'src/types/comments.types';
import { QUERY_KEY } from 'src/types/constants';

const useCreateComment = (id?: string) => {
  const mutation = useMutation({
    mutationFn: commentsServices.create,
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

  const create = (payload: CommentT) => {
    mutate(payload, {
      onSuccess() {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.GET_COMMENTS, id],
        });
      },
    });
  };
  return {
    create,
    isLoading: isPending,
  };
};

export default useCreateComment;
