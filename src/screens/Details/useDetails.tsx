import { useMemo } from 'react';
import useGetOneFishing from 'src/hooks/useGetOneFishing';
import SettingTab from './Tabs/SettingTab';
import PhotoTab from './Tabs/PhotoTab';
import InfoTab from './Tabs/InfoTab';
import CommentsTab from './Tabs/CoomentsTab';
import type { Route } from 'react-native-tab-view';
import { SceneMap } from 'react-native-tab-view';
import { DateilsTabs } from './Tabs/types';

export const useDetails = (id: string) => {
  const { data: oneFishing } = useGetOneFishing(id);

  const photoTab = useMemo(() => <PhotoTab data={oneFishing} />, [oneFishing]);
  const settingTab = useMemo(
    () => <SettingTab data={oneFishing} />,
    [oneFishing],
  );
  const infoTab = useMemo(() => <InfoTab data={oneFishing} />, [oneFishing]);
  const commentsTab = useMemo(
    () => <CommentsTab data={oneFishing} />,
    [oneFishing],
  );

  const renderScene = useMemo(
    () =>
      SceneMap({
        [DateilsTabs.INFO]: () => infoTab,
        [DateilsTabs.PHOTO]: () => photoTab,
        [DateilsTabs.COMMENTS]: () => commentsTab,
        [DateilsTabs.SETTING]: () => settingTab,
      }),
    [infoTab, photoTab, settingTab, commentsTab],
  );

  const routes: Route[] = [
    {
      key: DateilsTabs.INFO,
      title: 'ІНФО',
    },
    {
      key: DateilsTabs.PHOTO,
      title: 'ФОТО',
    },
    {
      key: DateilsTabs.COMMENTS,
      title: 'КОММ',
    },
    {
      key: DateilsTabs.SETTING,
      title: 'SET',
    },
  ];

  return {
    renderScene,
    oneFishing,
    routes,
  };
};
