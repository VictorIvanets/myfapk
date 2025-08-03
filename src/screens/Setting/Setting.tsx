import React from 'react';
import { StyleSheet } from 'react-native';
import { STORAGE_KEYS_ACCESS_TOKEN } from 'src/api/PREFIX';
import { clearState } from 'src/api/storage';
import Button from 'src/components/Button';
import FadeInView from 'src/components/FadeInView';
import Flex from 'src/components/Flex';
import Text from 'src/components/Text';
import { useAppNavigation } from 'src/hooks/useAppNavigation';

const Setting = () => {
  const navigation = useAppNavigation();

  return (
    <FadeInView style={styles.container}>
      <Flex flex gap="s10" center style={styles.container}>
        <Flex flex center>
          <Text>Setting</Text>
        </Flex>

        <Flex>
          <Button
            title="log out"
            onPress={() => {
              clearState(STORAGE_KEYS_ACCESS_TOKEN);
              navigation.navigate('Login');
            }}
          />
        </Flex>
      </Flex>
    </FadeInView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default Setting;
