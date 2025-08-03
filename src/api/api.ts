import axios from 'axios';
import { PREFIX, STORAGE_KEYS_ACCESS_TOKEN } from './PREFIX';
import type { LoginAuthState } from 'src/types/auth.types';
import { loadState } from './storage';

export const api = axios.create({
  baseURL: `${PREFIX}`,
  withCredentials: false,
});

api.interceptors.request.use(async config => {
  const accessToken = await loadState<LoginAuthState>(
    STORAGE_KEYS_ACCESS_TOKEN,
  );

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken.access_token}`;
  } else {
    config.headers.Authorization = '';
  }

  return config;
});
