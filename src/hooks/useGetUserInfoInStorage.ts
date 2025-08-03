import { useEffect, useState } from 'react';
import { STORAGE_KEYS_ACCESS_TOKEN } from 'src/api/PREFIX';
import { loadState } from 'src/api/storage';
import type { LoginResponseT } from 'src/types/auth.types';

const useGetUserInfoInStorage = (): LoginResponseT | undefined => {
  const [user, setUser] = useState<LoginResponseT>();
  useEffect(() => {
    const loadStorage = async () => {
      const token = await loadState<LoginResponseT>(STORAGE_KEYS_ACCESS_TOKEN);

      setUser(token);
    };
    loadStorage();
  });

  return user;
};

export default useGetUserInfoInStorage;
