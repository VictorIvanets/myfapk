import { ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
import Flex from 'src/components/Flex';
import { colors } from 'src/theme/colors';
import { PostsTabs } from './Tabs/types';
import { useMemo } from 'react';
import { SceneMap } from 'react-native-tab-view';
import TabView from 'src/components/TabView';
import useGetUserInfo from 'src/hooks/user/useGetUserInfo';
import Header from 'src/features/Header/Header';
import AllPosts from './Tabs/AllPosts';
import UserPosts from './Tabs/UserPosts';
const screenWidth = Dimensions.get('window').width;
const TAB_WIDTH = screenWidth / 2 - 16;

const Posts = () => {
  const userFishingTab = useMemo(() => <UserPosts />, []);
  const { userInfo } = useGetUserInfo();
  const allFishingTab = useMemo(() => <AllPosts />, []);

  const renderScene = useMemo(
    () =>
      SceneMap({
        [PostsTabs.USER]: () => userFishingTab,
        [PostsTabs.ALL]: () => allFishingTab,
      }),
    [userFishingTab, allFishingTab],
  );

  return (
    <Flex flex gap="s3" style={styles.container}>
      <Header userInfo={userInfo} />
      <TabView
        tabStyle={styles.tabStyle}
        tabBarStyle={styles.tabBar}
        labelStyle={styles.label}
        indicatorStyle={{
          width: TAB_WIDTH,
          backgroundColor: colors.ACCENT50,
        }}
        lazy
        swipeEnabled
        scrollEnabled
        renderLazyPlaceholder={() => (
          <ActivityIndicator size={50} color={colors.ACCENT} />
        )}
        defaultTabIndex={0}
        routes={[
          {
            key: PostsTabs.ALL,
            title: 'Дошка',
          },
          {
            key: PostsTabs.USER,
            title: 'Мої записи',
          },
        ]}
        renderScene={renderScene}
      />
    </Flex>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.MAIN,
    padding: 12,
  },
  tabBar: {
    alignSelf: 'stretch',
    marginBottom: 10,
  },
  tabStyle: {
    width: TAB_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: colors.RED,
  },
});

export default Posts;
