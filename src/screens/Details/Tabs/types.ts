import type { OneFishingT } from 'src/types/fishing';

export enum DateilsTabs {
  PHOTO = 'photo',
  INFO = 'info',
  SETTING = 'setting',
  COMMENTS = 'comments',
}

export type TabProps = {
  data: OneFishingT | undefined;
};
