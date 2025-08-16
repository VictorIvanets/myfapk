import type { CommentResponseT } from 'src/types/comments.types';
import type { OneFishingT } from 'src/types/fishing';

export enum DateilsTabs {
  PHOTO = 'photo',
  INFO = 'info',
  COMMENTS = 'comments',
}

export type TabProps = {
  data: OneFishingT | undefined;
  comments?: CommentResponseT[] | undefined;
};

export type TabCommentProps = {
  data: OneFishingT | undefined;
  comments: CommentResponseT[];
  isLoading: boolean;
  refetch: () => void;
};
