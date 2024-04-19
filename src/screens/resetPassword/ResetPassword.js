import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import LoginFormInput from '../../components/textInputs/LoginFormInput';
import Styles from './Styles';
import MainButton from '../../components/buttons/MainButton';

const ResetPassword = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState('');

    const handleResetPassword = async () => {
        setLoading(true);
        try {
          await auth().sendPasswordResetEmail(email);
          setLoading(false);
          navigation.goBack();
          Alert.alert(
            'Password Reset Email Sent',
            'Please check your email to reset your password.',
          );
        } catch (error) {
          console.error('Error sending password reset email:', error);
          Alert.alert(
            'Password Reset Failed',
            'An error occurred while attempting to reset your password. Please try again later.',
          );
        }
      };
  return (
    <View style={Styles.container}>
      <Text style={Styles.title}>Password Reset</Text>
      <View style={{width:'80%'}}>
        <Text style={Styles.mainText}>Please enter you email</Text>
      </View>
      <LoginFormInput value={email} placeHolder={"Email"} secure={false} onChange={(text) => setEmail(text)} />
      <MainButton title={"Submit"} loading={loading} onPress={() => handleResetPassword()} />
    </View>
  )
}

export default ResetPassword;