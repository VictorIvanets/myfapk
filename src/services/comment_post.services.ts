import { api } from 'src/api/api';
import { API_ENDPOINTS } from './API_ENDPOINTS';
import { AxiosError } from 'axios';
import type {
  CommentPostPayloadT,
  CommentPostT,
  DelByIdResponseT,
  DeleteCommentPostPayloadT,
} from 'src/types/posts.types';

class CommentsPostServices {
  public async create(payload: CommentPostPayloadT): Promise<CommentPostT> {
    try {
      const result = await api.post(
        API_ENDPOINTS.COMMENTS_POSTS.CREATE,
        payload,
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

  public async getAllByPostId(_id: string): Promise<CommentPostT[]> {
    try {
      const result = await api.get(
        `${API_ENDPOINTS.COMMENTS_POSTS.GET_ALL_BY_POST_ID}${_id}`,
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

  public async deleteComment({
    commentId,
    postId,
  }: DeleteCommentPostPayloadT): Promise<DelByIdResponseT> {
    try {
      const result = await api.delete(API_ENDPOINTS.COMMENTS_POSTS.DELETE_ONE, {
        params: {
          commentId,
          postId,
        },
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
}

export const commentPostServices = new CommentsPostServices();
