import MaterialIcons from '@react-native-vector-icons/material-icons';
import { FlashList } from '@shopify/flash-list';
import React from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Image,
} from 'react-native';
import Divider from 'src/components/Divider';
import Flex from 'src/components/Flex';
import InputField from 'src/components/InputField/InputField';
import ScaleInPressable from 'src/components/ScaleInPressable';
import Text from 'src/components/Text';
import FishingCardPaid from 'src/features/FishingCard/FishingCardPaid';
import { useAppNavigation } from 'src/hooks/useAppNavigation';
import useGetPaid from 'src/hooks/fishing/useGetPaid';
import useGetUserInfo from 'src/hooks/user/useGetUserInfo';
import { colors } from 'src/theme/colors';

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
  const { navigate } = useAppNavigation();

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

      <Flex flex gap="s1" style={styles.list}>
        <InputField
          placeholderInput="Пошку по назві"
          onChangeText={setValueTitle}
          value={valueTitle}
          search
          borderColor={colors.SECOND}
          ibackground
        />
        <InputField
          placeholder="Пошку по опису"
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

export default PaidPlace;
