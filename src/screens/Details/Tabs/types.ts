import type { OneFishingT } from 'src/types/fishing';

export enum DateilsTabs {
  PHOTO = 'photo',
  INFO = 'info',
  COMMENTS = 'comments',
}

export type TabProps = {
  data: OneFishingT | undefined;
};
