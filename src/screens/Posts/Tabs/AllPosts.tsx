import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import Divider from 'src/components/Divider';
import Flex from 'src/components/Flex';
import InputField from 'src/components/InputField/InputField';
import Text from 'src/components/Text';
import PostCard from 'src/features/PostCard/PostCard';
import useGetAllPost from 'src/hooks/posts/useGetAllPosts';
import { colors } from 'src/theme/colors';

const AllPosts = () => {
  const {
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    posts,
    isRefetching,
    refetchData,
    valueDescription,
    setValueDescription,
  } = useGetAllPost();
  return (
    <Flex flex gap="s1" style={styles.container}>
      <InputField
        placeholder="Пошук"
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
        data={posts}
        renderItem={({ item }) => <PostCard item={item} />}
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

export default AllPosts;
