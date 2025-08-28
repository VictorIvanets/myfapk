export type PostsResponseT = {
  data: PostT[];
  nextCursor: string | null;
};
export type PostT = {
  _id: string;
  userLogin: string;
  userId: string;
  description: string;
  colorSchema: string;
  commentCount: number;
  createdAt: string;
};

export type PostPayloadT = {
  description: string;
  colorSchema: string;
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
