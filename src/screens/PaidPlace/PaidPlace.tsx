import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import Divider from 'src/components/Divider';
import Flex from 'src/components/Flex';
import InputField from 'src/components/InputField/InputField';
import Text from 'src/components/Text';
import FishingCardPaid from 'src/features/FishingCard/FishingCardPaid';
import useGetPaid from 'src/hooks/fishing/useGetPaid';
import useGetUserInfo from 'src/hooks/user/useGetUserInfo';
import { colors } from 'src/theme/colors';
import Header from 'src/features/Header/Header';

const PaidPlace = () => {
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
  } = useGetPaid();
  const { userInfo } = useGetUserInfo();

  return (
    <Flex flex gap="s3" style={styles.container}>
      <Header userInfo={userInfo} />

      <Flex flex gap="s1" style={styles.list}>
        <InputField
          placeholderInput="Пошук по назві"
          onChangeText={setValueTitle}
          value={valueTitle}
          search
          borderColor={colors.SECOND}
          ibackground
        />
        <InputField
          placeholder="Пошук по опису"
          onChangeText={setValueDescription}
          value={valueDescription}
          search
          borderColor={colors.SECOND}
          ibackground
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
          renderItem={({ item }) => <FishingCardPaid item={item} />}
        />
      </Flex>
    </Flex>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    backgroundColor: colors.MAIN,
    padding: 12,
  },
});

export default PaidPlace;
