import { useMutation, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { postsServices } from 'src/services/posts.services';
import { QUERY_KEY } from 'src/types/constants';

const useDeletePost = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postsServices.deleteById,
    onError: error => {
      Toast.show({
        type: 'errorToast',
        text1: 'Помилка!',
        text2: error.message,
      });
    },
    onSuccess() {
      Toast.show({
        type: 'succssesToast',
        text1: 'Успіх',
        text2: 'пост видалено',
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
    deletePost: mutation.mutate,
    isLoading: mutation.isPending,
  };
};

export default useDeletePost;
