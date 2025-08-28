import { api } from 'src/api/api';
import { API_ENDPOINTS } from './API_ENDPOINTS';
import { AxiosError } from 'axios';
import type {
  DelByIdResponseT,
  PostPayloadT,
  PostsResponseT,
  PostT,
} from 'src/types/posts.types';

class PostsServices {
  public async create(payload: PostPayloadT): Promise<PostT> {
    try {
      const result = await api.post(API_ENDPOINTS.POSTS.CREATE, payload);
      return result.data;
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.data) {
          throw new Error(e.response.data.message);
        }
        throw new Error(e.message);
      }
      throw new Error('Unexpected error');
    }
  }

  public async getOne(_id: string): Promise<PostT> {
    try {
      const result = await api.get(
        `${API_ENDPOINTS.POSTS.GET_ONE_BY_ID}${_id}`,
      );
      return result.data;
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.data) {
          throw new Error(e.response.data.message);
        }
        throw new Error(e.message);
      }
      throw new Error('Unexpected error');
    }
  }

  public async getAll(
    cursor?: string,
    description?: string,
    limit = 5,
  ): Promise<PostsResponseT> {
    try {
      const result = await api.get(API_ENDPOINTS.POSTS.GET_ALL, {
        params: { cursor, limit, description },
      });
      return result.data;
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.data) {
          throw new Error(e.response.data.message);
        }
        throw new Error(e.message);
      }
      throw new Error('Unexpected error');
    }
  }

  public async getAllByUser(
    cursor?: string,
    description?: string,
    limit = 4,
  ): Promise<PostsResponseT> {
    try {
      const result = await api.get(API_ENDPOINTS.POSTS.GET_ALL_BY_USER, {
        params: { cursor, limit, description },
      });
      return result.data;
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.data) {
          throw new Error(e.response.data.message);
        }
        throw new Error(e.message);
      }
      throw new Error('Unexpected error');
    }
  }

  public async deleteById(_id: string): Promise<DelByIdResponseT> {
    try {
      const result = await api.delete(
        `${API_ENDPOINTS.POSTS.DELETE_ONE}${_id}`,
      );
      return result.data;
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.data) {
          throw new Error(e.response.data.message);
        }
        throw new Error(e.message);
      }
      throw new Error('Unexpected error');
    }
  }
}

export const postsServices = new PostsServices();
