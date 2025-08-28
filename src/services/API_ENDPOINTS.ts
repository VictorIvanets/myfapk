export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: 'auth/login',
    REGISTER: 'auth/register',
    USER_INFO: 'auth/userinfo',
  },
  FISHING: {
    GET_ALL_BY_USER: 'fishings/user',
    GET_ALL: 'fishings/all',
    GET_PAID: 'fishings/paid',
    GET_ALL_FOR_MAP: 'fishings/allformap',
    GET_ONE_BY_ID: 'fishings/onesets/',
    CREATE_POST: 'fishings/create',
    UPDATE_POST: 'fishings/update/',
    DELETE: 'fishings/',
  },
  PHOTO: {
    UPLOAD: 'photo/upload/',
    DOWNLOAD: 'getfoto/get/',
    DELETE: 'fishings/deletephoto',
  },
  COMMENTS: {
    CREATE: 'comment/add',
    GET: 'comment/',
    DELETE_ONE: 'comment/',
    DELETE_BY_SETID: 'comment/set/',
  },
  POSTS: {
    CREATE: 'posts/create',
    GET_ALL_BY_USER: 'posts/user',
    GET_ALL: 'posts/all',
    GET_ONE_BY_ID: 'posts/onepost/',
    DELETE_ONE: 'posts/',
  },
  COMMENTS_POSTS: {
    CREATE: 'postcomment/create',
    GET_ALL_BY_POST_ID: 'postcomment/',
    DELETE_ONE: 'postcomment/delete',
  },
  CHECK: 'auth/check',
} as const;
