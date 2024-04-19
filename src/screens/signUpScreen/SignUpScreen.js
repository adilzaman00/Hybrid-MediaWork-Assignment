import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import Styles from './Styles';
import MainButton from '../../components/buttons/MainButton';
import LoginFormInput from '../../components/textInputs/LoginFormInput';
import { setAsyncStorage } from '../../asyncStorage/Index';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (email == "") {
      Alert.alert("Please enter email");
    }
    else if (password == "") {
      Alert.alert("please enter password");
    }
    else {
      try {
        setLoading(true);
        const userCredential = await auth().createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        console.log('Logged in user:', user);
        setAsyncStorage("UserID", user.uid);
        setLoading(false);
        Alert.alert(
          '',
          'Registered Succussfully!!!',
          [
            {
              text: 'Ok',
              onPress: () => {
                navigation.replace("HomeScreen");
              },
            },
          ]
        );
        
      } catch (error) {
        setLoading(false);
        console.log('Login error:', error);
        switch (error.code) {
          case 'auth/email-already-in-use':
            Alert.alert('Email already in use', 'The email address is already registered.');
            break;
          case 'auth/weak-password':
            Alert.alert('Weak password', 'Please choose a stronger password.');
            break;
          case 'auth/invalid-email':
            Alert.alert('Invalid email', 'Please enter a valid email address.');
            break;
          default:
            Alert.alert('Signup failed', 'An error occurred while signing up. Please try again later.');
            break;
        }
      }
    }
  };

  return (
    <View style={Styles.container}>
      <Text style={Styles.title}>Sign up</Text>
      <LoginFormInput value={email} placeHolder={"Email"} secure={false} onChange={(text) => setEmail(text)} />
      <LoginFormInput value={password} placeHolder={"Password"} secure={true} onChange={(text) => setPassword(text)} />
      <MainButton title={"Signup"} loading={loading} onPress={() => handleSignup()} />
      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={Styles.signupText}>Already have an account? Login here</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;