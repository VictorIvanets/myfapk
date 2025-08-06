import React, { forwardRef, useState } from 'react';
import type { TextInputProps } from 'react-native';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { colors } from 'src/theme/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Flex from '../Flex';

type BaseProps = {
  label?: string;
  error?: string;
  appearance?: 'small' | 'standard';
  ibackground?: boolean;
  heightArea?: number;
  multiline?: boolean;
  search?: boolean;
  placeholderInput?: string;
};

type InputFieldProps = TextInputProps & BaseProps;

const InputField = forwardRef<TextInput, InputFieldProps>(
  (
    {
      label,
      error,
      placeholderInput = ' ',
      appearance = 'small',
      ibackground = false,
      heightArea = 150,
      multiline = false,
      secureTextEntry,
      style,
      search,
      ...rest
    },
    ref,
  ) => {
    const dynamicStyles = {
      backgroundColor: ibackground ? colors.SECOND : undefined,
      height: multiline ? heightArea : 48,
      textAlignVertical: multiline ? ('top' as const) : ('center' as const),
    };
    const [isHidden, setIsHidden] = useState(!!secureTextEntry);
    const toggleVisibility = () => {
      setIsHidden(prev => !prev);
    };

    return (
      <View style={[styles.container, appearance === 'small' && styles.small]}>
        {label && (
          <Text style={[styles.label, error && styles.labelError]}>
            {label}
          </Text>
        )}

        <TextInput
          ref={ref}
          placeholder={placeholderInput}
          placeholderTextColor={colors.ACCENT50}
          secureTextEntry={secureTextEntry ? isHidden : false}
          multiline={multiline}
          style={[
            styles.input,
            dynamicStyles,
            error && styles.inputError,
            style,
          ]}
          {...rest}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={toggleVisibility} style={styles.eyeButton}>
            {isHidden ? (
              <Ionicons name="eye-off-outline" size={20} color="#999" />
            ) : (
              <Ionicons name="eye-outline" size={20} color="#999" />
            )}
          </TouchableOpacity>
        )}
        {search && (
          <Flex style={styles.search}>
            <Ionicons name="search" size={20} color="#999" />
          </Flex>
        )}

        {error && <Text style={styles.errorMessage}>{error}</Text>}
      </View>
    );
  },
);

export default InputField;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 12,
  },
  small: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.ACCENT,
    borderRadius: 6,
    paddingHorizontal: 12,
    color: colors.TEXT,
    fontSize: 16,
    backgroundColor: colors.SECOND,
    ...Platform.select({
      ios: {
        paddingVertical: 12,
      },
      android: {
        paddingVertical: 8,
      },
    }),
  },
  inputError: {
    borderColor: colors.RED,
    color: colors.RED,
  },
  label: {
    color: colors.TEXT,
    marginBottom: 4,
    fontSize: 14,
  },
  labelError: {
    color: colors.RED,
  },
  errorMessage: {
    color: colors.RED,
    fontSize: 12,
    marginTop: 4,
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    top: 37,
  },
  search: {
    position: 'absolute',
    right: 12,
    top: 15,
  },
});
