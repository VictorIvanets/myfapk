import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import Divider from 'src/components/Divider';
import Flex from 'src/components/Flex';
import InputField from 'src/components/InputField/InputField';
import Text from 'src/components/Text';
import useGetAllByUser from 'src/hooks/useGetAllByUser';
import { colors } from 'src/theme/colors';
import FishingCard from '../FishingCard';

const UserFishing = () => {
  const {
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    allItems,
    isRefetching,
    refetchData,
    valueTitle,
    setValueTitle,
    valueDescription,
    setValueDescription,
  } = useGetAllByUser();

  return (
    <Flex flex gap="s1" style={styles.container}>
      <InputField
        placeholderInput="Пошку по назві"
        onChangeText={setValueTitle}
        value={valueTitle}
        ibackground
        search
      />
      <InputField
        placeholder="Пошку по опису"
        onChangeText={setValueDescription}
        value={valueDescription}
        ibackground
        search
      />
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
        estimatedItemSize={130}
        onEndReachedThreshold={0.4}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator size={80} color={colors.ACCENT} />
          ) : null
        }
        data={allItems}
        renderItem={({ item }) => <FishingCard item={item} />}
      />
    </Flex>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default UserFishing;
