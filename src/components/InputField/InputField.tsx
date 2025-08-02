// InputField.tsx
import React, { forwardRef } from 'react';
import type { TextInputProps } from 'react-native';
import { TextInput, View, Text, StyleSheet, Platform } from 'react-native';

type BaseProps = {
  label?: string;
  error?: string;
  appearance?: 'small' | 'standard';
  ibackground?: boolean;
  heightArea?: number;
  multiline?: boolean;
};

type InputFieldProps = TextInputProps & BaseProps;

const InputField = forwardRef<TextInput, InputFieldProps>(
  (
    {
      label,
      error,
      appearance = 'small',
      ibackground = false,
      heightArea = 150,
      multiline = false,
      style,
      ...rest
    },
    ref,
  ) => {
    const dynamicStyles = {
      backgroundColor: ibackground ? '#ffffff1d' : undefined,
      height: multiline ? heightArea : 48,
      textAlignVertical: multiline ? ('top' as const) : ('center' as const),
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
          placeholder=" "
          placeholderTextColor="#999"
          multiline={multiline}
          style={[
            styles.input,
            dynamicStyles,
            error && styles.inputError,
            style,
          ]}
          {...rest}
        />

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
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 12,
    color: 'white',
    fontSize: 16,
    backgroundColor: '#00000048',
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
    borderColor: 'red',
    color: 'red',
  },
  label: {
    color: 'white',
    marginBottom: 4,
    fontSize: 14,
  },
  labelError: {
    color: 'red',
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});
