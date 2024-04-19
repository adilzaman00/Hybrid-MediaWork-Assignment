import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const LoginFormInput = ({onChange, value, secure, placeHolder}) => {
  return (
    <TextInput
        style={styles.input}
        placeholder={placeHolder}
        onChangeText={onChange}
        value={value}
        autoCapitalize="none"
        secureTextEntry={secure}
      />
  )
}

export default LoginFormInput;

const styles = StyleSheet.create({
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
      },
});