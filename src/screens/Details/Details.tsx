import type { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Button from 'src/components/Button';
import Text from 'src/components/Text';
import { useAppNavigation } from 'src/hooks/useAppNavigation';
import type { RootStackParamListT } from 'src/Navigatior/route';

type Props = StackScreenProps<RootStackParamListT, 'Details'>;

const Details = ({ route }: Props) => {
  const data = route.params;
  const navigation = useAppNavigation();

  return (
    <View style={styles.container}>
      <Text>Details</Text>
      <Text>UserID {data.userId}</Text>
      <Button title="Назад" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Details;
