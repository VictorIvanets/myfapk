import { useQuery } from '@tanstack/react-query';
import { loginServices } from 'src/services/Login.services';
import { QUERY_KEY } from 'src/types/constants';

const useGetUserInfo = () => {
  const { data } = useQuery({
    queryKey: [QUERY_KEY.GET_USER],
    queryFn: () => loginServices.userInfo(),
  });
  return {
    userInfo: data,
  };
};

export default useGetUserInfo;
