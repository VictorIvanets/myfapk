import { useMutation } from '@tanstack/react-query';
import { loginServices } from 'src/services/Login.services';
import type { RegisterPayloadT } from 'src/types/auth.types';
import { Alert } from 'react-native';
import useLogIn from './useLogIn';

const useRegisterUser = () => {
  const mutation = useMutation({
    mutationFn: loginServices.register,
    onError: error => {
      Alert.alert(
        'ERROR',
        error.message,
        [
          { text: 'OK', onPress: () => console.log(error.message) },
          { text: 'Скасувати', style: 'cancel' },
        ],
        { cancelable: true },
      );
    },
  });

  const { mutate, isPending, error, isError } = mutation;
  const { logIn } = useLogIn();

  const register = (payload: RegisterPayloadT) => {
    mutate(payload, {
      onSuccess(response) {
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
