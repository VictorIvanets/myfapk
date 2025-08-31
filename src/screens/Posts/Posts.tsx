import { ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
import Flex from 'src/components/Flex';
import { colors } from 'src/theme/colors';
import { PostsTabs } from './Tabs/types';
import { useMemo, useState } from 'react';
import { SceneMap } from 'react-native-tab-view';
import TabView from 'src/components/TabView';
import useGetUserInfo from 'src/hooks/user/useGetUserInfo';
import Header from 'src/features/Header/Header';
import AllPosts from './Tabs/AllPosts';
import UserPosts from './Tabs/UserPosts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ScaleInPressable from 'src/components/ScaleInPressable';
import AddPost from 'src/features/AddPost/AddPost';
import DraggableAddButton from 'src/components/DraggableAddButton/DraggableAddButton';

const screenWidth = Dimensions.get('window').width;
const TAB_WIDTH = screenWidth / 2 - 16;

const Posts = () => {
  const [addView, setAddView] = useState(false);
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
    <Flex rel flex gap="s3" style={styles.container}>
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
      {/* <ScaleInPressable onPress={() => setAddView(!addView)} style={styles.add}>
        {addView ? (
          <MaterialIcons
            name="close-fullscreen"
            size={60}
            color={colors.ACCENT}
          />
        ) : (
          <Flex center style={styles.addbox}>
            <MaterialIcons name="post-add" size={40} color={colors.WHITE} />
          </Flex>
        )}
      </ScaleInPressable> */}
      {addView ? (
        <ScaleInPressable
          onPress={() => setAddView(!addView)}
          style={styles.add}
        >
          <MaterialIcons
            name="close-fullscreen"
            size={60}
            color={colors.ACCENT}
          />
        </ScaleInPressable>
      ) : (
        <DraggableAddButton setAddView={setAddView} addView={addView} />
      )}
      {addView && <AddPost onClose={setAddView} />}
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
  add: {
    position: 'absolute',
    bottom: '0.5%',
    right: '1%',
    zIndex: 25,
  },
  // addbox: {
  //   backgroundColor: colors.ACCENT,
  //   borderRadius: '50%',
  //   padding: 10,
  //   transform: [{ translateY: -45 }],
  // },
});

export default Posts;
