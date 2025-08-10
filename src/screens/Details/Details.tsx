import type { StackScreenProps } from '@react-navigation/stack';
import { ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from 'src/components/Button';
import FadeInView from 'src/components/FadeInView';
import Flex from 'src/components/Flex';
import Text from 'src/components/Text';
import { useAppNavigation } from 'src/hooks/useAppNavigation';
import type { RootStackParamListT } from 'src/Navigatior/route';
import { colors } from 'src/theme/colors';
import TabView from 'src/components/TabView';
import { useDetails } from './useDetails';
const screenWidth = Dimensions.get('window').width;
const TAB_WIDTH = screenWidth / 4;

type Props = StackScreenProps<RootStackParamListT, 'Details'>;

const Details = ({ route }: Props) => {
  const data = route.params;
  const navigation = useAppNavigation();
  const { renderScene, oneFishing, routes } = useDetails(data.id);

  return (
    <FadeInView style={styles.container}>
      <Flex style={styles.header}>
        <Text color="TEXTDARK">Назва/Місце:</Text>
        <Text size="Bh4">
          {oneFishing?.title}{' '}
          <Text size="caption">
            <Ionicons name="star" size={14} color={colors.ACCENT} />{' '}
            {oneFishing?.score}
          </Text>
        </Text>
      </Flex>
      <Flex flex>
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
          routes={routes}
          renderScene={renderScene}
        />
      </Flex>
      <Flex center style={styles.footer}>
        <Button view="max" title="Назад" onPress={() => navigation.goBack()} />
      </Flex>
    </FadeInView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.MAIN,
  },
  header: {
    padding: 12,
    paddingBottom: 10,
    borderBottomWidth: 3,
    borderColor: colors.SECOND,
  },
  footer: {
    padding: 12,
  },
  tabBar: {
    alignSelf: 'stretch',
    marginBottom: 10,
    backgroundColor: colors.SECOND20,
  },
  tabStyle: {
    width: TAB_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Details;
