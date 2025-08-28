import { ActivityIndicator, Dimensions, Image, StyleSheet } from 'react-native';
import Flex from 'src/components/Flex';
import { colors } from 'src/theme/colors';
import AllFishing from './Tabs/AllFishing';
import UserFishing from './Tabs/UserFishing';
import { FishingTabs } from './Tabs/types';
import { useMemo } from 'react';
import { SceneMap } from 'react-native-tab-view';
import TabView from 'src/components/TabView';
import Text from 'src/components/Text';
import useGetUserInfo from 'src/hooks/user/useGetUserInfo';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import ScaleInPressable from 'src/components/ScaleInPressable';
import { useAppNavigation } from 'src/hooks/useAppNavigation';
const screenWidth = Dimensions.get('window').width;
const TAB_WIDTH = screenWidth / 2 - 16;

const Home = () => {
  const userFishingTab = useMemo(() => <UserFishing />, []);
  const { userInfo } = useGetUserInfo();
  const { navigate } = useAppNavigation();
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
      <Flex style={styles.header} centerH row spread>
        <Image
          source={require('../../../assets/images/logoMf-01.png')}
          style={styles.image}
        />
        <ScaleInPressable onPress={() => navigate('Setting')}>
          <Flex centerH row gap="s1">
            <Flex right gap="s1">
              <Text size="subtitlemin"> {userInfo?.name}</Text>
              <Text size="subtitlemin"> {userInfo?.city}</Text>
              <Text size="subtitlemin"> {userInfo?.country}</Text>
            </Flex>
            <MaterialIcons
              name="account-circle"
              size={50}
              color={colors.ACCENT}
            />
          </Flex>
        </ScaleInPressable>
      </Flex>
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
  label: {
    color: colors.RED,
  },
  image: {
    width: 160,
    height: 60,
    resizeMode: 'contain',
  },
  header: {
    borderBottomColor: colors.SECOND,
    borderBottomWidth: 3,
    paddingBottom: 10,
    borderRadius: 15,
  },
});

export default Home;
