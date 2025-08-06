import { ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
import Flex from 'src/components/Flex';
import { colors } from 'src/theme/colors';
import AllFishing from './Tabs/AllFishing';
import UserFishing from './Tabs/UserFishing';
import { FishingTabs } from './Tabs/types';
import { useMemo } from 'react';
import { SceneMap } from 'react-native-tab-view';
import TabView from 'src/components/TabView';
const screenWidth = Dimensions.get('window').width;
const TAB_WIDTH = screenWidth / 2 - 16;

const Home = () => {
  const userFishingTab = useMemo(() => <UserFishing />, []);

  const allFishingTab = useMemo(() => <AllFishing />, []);

  const renderScene = useMemo(
    () =>
      SceneMap({
        [FishingTabs.USER]: () => userFishingTab,
        [FishingTabs.ALL]: () => allFishingTab,
      }),
    [userFishingTab, allFishingTab],
  );

  return (
    <Flex flex gap="s3" style={styles.container}>
      <TabView
        tabStyle={styles.tabStyle}
        tabBarStyle={styles.tabBar}
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
            key: FishingTabs.USER,
            title: 'ВАШІ ЗАПИСИ',
          },
          {
            key: FishingTabs.ALL,
            title: 'ВСІ ЗАПИСИ',
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
});

export default Home;
