import { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet } from 'react-native';
import type { ToastShowParams } from 'react-native-toast-message';
import Flex from 'src/components/Flex';
import Text from 'src/components/Text';
import { colors } from 'src/theme/colors';

const toastConfig = {
  errorToast: ({ text1, text2 }: ToastShowParams) => (
    <Flex gap="s2" row style={styles.container}>
      <Flex style={styles.redline} />
      <Flex flex center>
        <Image
          source={require('../../assets/images/logoMf-01.png')}
          style={styles.image}
        />
      </Flex>
      <Flex flex centerV>
        <Text size="Bsubtitle">{text1}</Text>
        <Text size="Bsubtitle">{text2}</Text>
      </Flex>
    </Flex>
  ),

  succssesToast: ({ text1, text2 }: ToastShowParams) => (
    <Flex gap="s3" row style={styles.container}>
      <Flex style={styles.greenline} />
      <Flex center>
        <Image
          source={require('../../assets/images/logoMf-01.png')}
          style={styles.image}
        />
      </Flex>
      <Flex centerV>
        <Text size="Bsubtitle">{text1}</Text>
        <Text size="Bsubtitle">{text2}</Text>
      </Flex>
    </Flex>
  ),

  loadingToast: ({ text1 }: ToastShowParams) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const progress = useRef(new Animated.Value(0)).current;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(progress, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: false,
          }),
        ]),
      ).start();
    }, [progress]);

    const widthInterpolated = progress.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '100%'],
    });

    return (
      <Flex gap="s3" row style={styles.container}>
        <Flex style={styles.greenline} />
        <Flex center>
          <Image
            source={require('../../assets/images/logoMf-01.png')}
            style={styles.image}
          />
        </Flex>
        <Flex centerV flex>
          <Text size="Bsubtitle">{text1}</Text>
          <Flex style={styles.progressContainer}>
            <Animated.View
              style={[styles.progressBar, { width: widthInterpolated }]}
            />
          </Flex>
        </Flex>
      </Flex>
    );
  },
};

export default toastConfig;

const styles = StyleSheet.create({
  redline: {
    height: '100%',
    width: 25,
    backgroundColor: colors.RED,
  },
  greenline: {
    height: '100%',
    width: 25,
    backgroundColor: colors.ACCENT,
  },
  container: {
    justifyContent: 'flex-start',
    height: 70,
    width: '100%',
    backgroundColor: colors.MAIN,
    borderColor: colors.TEXT,
    borderWidth: 0.5,
    borderRadius: 5,
    overflow: 'hidden',
  },
  image: {
    width: 60,
    height: 40,
    resizeMode: 'contain',
  },
  progressContainer: {
    height: 6,
    backgroundColor: '#333',
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: 6,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.ACCENT,
  },
});
