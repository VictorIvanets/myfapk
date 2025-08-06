import { ActivityIndicator, RefreshControl, StyleSheet } from 'react-native';
import Flex from 'src/components/Flex';
import Text from 'src/components/Text';
import { colors } from 'src/theme/colors';
import { FlashList } from '@shopify/flash-list';
import Divider from 'src/components/Divider';
import useGetAll from 'src/hooks/useGetAll';
import InputField from 'src/components/InputField/InputField';

const Home = () => {
  // const user = useGetUserInfoInStorage();

  const {
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    allItems,
    isRefetching,
    refetchData,
    value,
    setValue,
  } = useGetAll();

  // console.log('allItems.length', allItems.length);

  return (
    <Flex flex gap="s3" style={styles.container}>
      <Text>Всі рибалки</Text>
      <InputField onChangeText={setValue} value={value} ibackground search />
      {error && <Text>{error.message}</Text>}
      <FlashList
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetchData} />
        }
        ItemSeparatorComponent={Divider}
        onEndReached={() => {
          if (!isLoading && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        estimatedItemSize={150}
        onEndReachedThreshold={0.4}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator size={80} color={colors.ACCENT} />
          ) : null
        }
        data={allItems}
        renderItem={({ item }) => {
          return (
            <Flex center flex style={styles.item}>
              <Text>{item.title}</Text>
            </Flex>
          );
        }}
      />
    </Flex>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.MAIN,
    padding: 12,
  },
  item: {
    width: '100%',
    height: 150,
    backgroundColor: colors.BLUE50,
  },
});

export default Home;
