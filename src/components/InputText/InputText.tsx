import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import Text from '../Text';
import { colors } from 'src/theme/colors';
import { spacings } from 'src/theme';
import Flex from '../Flex';

const InputText = () => {
  const [loginInput, setLoginInput] = useState('');
  const [viewLabelLogin, setViewLabelLogin] = useState(true);

  useEffect(() => {
    if (loginInput.length > 0) setViewLabelLogin(false);
    else setViewLabelLogin(true);
  }, [loginInput]);

  return (
    <View style={styles.inputpass}>
      <TextInput
        style={styles.input}
        onChangeText={t => {
          setLoginInput(t);
        }}
        value={loginInput}
      />
      <Flex style={styles.inputBottoLine}></Flex>
      <Text
        style={viewLabelLogin ? styles.inputLabel : styles.inputLabelActiv}
        size="subtitle"
      >
        login
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    color: 'rgba(255, 255, 255, 0.8)',
    height: 50,
    backgroundColor: 'none',
    padding: 10,
    fontSize: 20,
    width: '100%',
    zIndex: 2,
    borderColor: colors.ACCENT,
    borderWidth: 1,
  },
  inputLabel: {
    color: 'white',
    position: 'absolute',
    top: 13,
    left: 10,
    fontSize: 17,
    zIndex: 10,
    backgroundColor: colors.MAIN,
    padding: 1,
  },
  inputLabelActiv: {
    position: 'absolute',
    top: -10,
    left: 10,
    fontSize: 12,
    zIndex: 1,
  },
  inputpass: {
    width: '80%',
    height: 40,
    marginBottom: 30,
    borderRadius: spacings.s2,
  },
  inputBottoLine: {
    backgroundColor: colors.ACCENT,
    width: '100%',
    height: 1,
  },
});

export default InputText;
