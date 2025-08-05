import type { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import Button from 'src/components/Button';
import FadeInView from 'src/components/FadeInView';
import Flex from 'src/components/Flex';
import Text from 'src/components/Text';
import { useAppNavigation } from 'src/hooks/useAppNavigation';
import useGetOneFishing from 'src/hooks/useGetOneFishing';
import type { RootStackParamListT } from 'src/Navigatior/route';
import { colors } from 'src/theme/colors';

type Props = StackScreenProps<RootStackParamListT, 'Details'>;

const Details = ({ route }: Props) => {
  const data = route.params;
  const navigation = useAppNavigation();
  const { data: oneFishing } = useGetOneFishing(data.id);

  return (
    <FadeInView style={styles.container}>
      <Text>Details</Text>
      <Flex>
        <Text>{oneFishing?.title}</Text>
        <Text>{oneFishing?.description}</Text>
        <Text>{oneFishing?.img.length}</Text>
      </Flex>
      <Button title="Назад" onPress={() => navigation.goBack()} />
    </FadeInView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: colors.MAIN,
  },
});

export default Details;
