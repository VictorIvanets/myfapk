import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { TabBar, TabView as RNTabView } from 'react-native-tab-view';
import Flex from 'src/components/Flex';
import type { TextStyle, ViewStyle } from 'react-native';
import type { Route, TabViewProps } from 'react-native-tab-view';
import { colors } from 'src/theme/colors';

type OmittedTabViewProps = Omit<
  TabViewProps<Route>,
  'onIndexChange' | 'navigationState' | 'renderTabBar'
>;

type Props = OmittedTabViewProps & {
  defaultTabIndex?: number;
  routes: Route[];
  tabBarStyle?: ViewStyle;
  tabBarContainerStyle?: ViewStyle;
  tabStyle?: ViewStyle;
  indicatorStyle?: ViewStyle;
  labelStyle?: TextStyle;
  scrollEnabled?: boolean;
  children?: React.ReactNode;
  onIndexChange?: (index: number) => void;
};

function TabView({
  defaultTabIndex,
  onIndexChange,
  routes,
  tabBarStyle,
  tabStyle,
  indicatorStyle,
  tabBarContainerStyle,
  scrollEnabled = true,
  children,
  ...tabViewProps
}: Props) {
  const [tabIndex, setTabIndex] = useState(defaultTabIndex ?? 0);

  const handleIndexChange = (index: number) => {
    setTabIndex(index);
    onIndexChange?.(index);
  };
  const isChildrenExist = !!children;

  return (
    <RNTabView
      swipeEnabled
      {...tabViewProps}
      navigationState={{
        index: tabIndex,
        routes,
      }}
      renderTabBar={props => (
        <Flex
          style={[
            isChildrenExist && s.tabBarWithChildren,
            tabBarContainerStyle,
          ]}
        >
          <TabBar
            {...props}
            style={[
              s.tabBar,
              {
                backgroundColor: colors.MAIN,
              },
              tabBarStyle,
            ]}
            tabStyle={tabStyle}
            android_ripple={{
              borderless: false,
              color: 'transparent',
            }}
            indicatorStyle={[
              { backgroundColor: colors.ACCENT50 },
              s.indicatorStyle,
              indicatorStyle,
            ]}
            scrollEnabled={scrollEnabled}
          />
          {isChildrenExist && (
            <Flex row gap="s2">
              {children}
            </Flex>
          )}
        </Flex>
      )}
      onIndexChange={handleIndexChange}
    />
  );
}

const s = StyleSheet.create({
  tabBarWithChildren: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabBar: {
    width: '100%',
    shadowOpacity: 0,
    elevation: 0,
  },

  indicatorStyle: {
    width: 180,
    top: '85%',
  },
});

export default TabView;
