import { useMutation, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { commentsServices } from 'src/services/comments.services';
import { QUERY_KEY } from 'src/types/constants';

const useDeleteComment = (setId: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: commentsServices.deleteItem,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_COMMENTS, setId],
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

export default useDeleteComment;
