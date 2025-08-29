import type { ColorsKey } from 'src/features/PostCard/colorSchemaCard';

export type PostsResponseT = {
  data: PostT[];
  nextCursor: string | null;
};
export type PostT = {
  _id: string;
  userLogin: string;
  userId: string;
  description: string;
  colorSchema: ColorsKey;
  commentCount: number;
  createdAt: string;
};

export type PostPayloadT = {
  description: string;
  colorSchema: ColorsKey;
};

export type CommentPostPayloadT = {
  postId: string;
  comment: string;
};
export type DeleteCommentPostPayloadT = {
  commentId: string;
  postId: string;
};

export type CommentPostT = {
  _id: string;
  login: string;
  useId: string;
  postId: string;
  comment: string;
  createdAt: string;
};

export type DelByIdResponseT = {
  success: boolean;
  id?: string;
  message?: string;
};
