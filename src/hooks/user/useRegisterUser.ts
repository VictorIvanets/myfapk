import { useMutation } from '@tanstack/react-query';
import { loginServices } from 'src/services/Login.services';
import type { RegisterPayloadT } from 'src/types/auth.types';
import useLogIn from './useLogIn';
import Toast from 'react-native-toast-message';

const useRegisterUser = () => {
  const mutation = useMutation({
    mutationFn: loginServices.register,
    onError: error => {
      Toast.show({
        type: 'errorToast',
        text1: 'Помилка!',
        text2: error.message,
      });
    },
  });

  const { mutate, isPending, error, isError } = mutation;
  const { logIn } = useLogIn();

  const register = (payload: RegisterPayloadT) => {
    mutate(payload, {
      onSuccess(response) {
        Toast.show({
          type: 'succssesToast',
          text1: 'Успіх',
          text2: 'Вас зареєстровано',
        });
        response && logIn({ login: payload.login, password: payload.password });
      },
    });
  };

  return {
    register,
    isLoading: isPending,
    error,
    isError,
  };
};

export default useRegisterUser;
