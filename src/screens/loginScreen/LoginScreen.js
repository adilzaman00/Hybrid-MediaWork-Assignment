import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import Styles from './Styles';
import { setAsyncStorage } from '../../asyncStorage/Index';
import MainButton from '../../components/buttons/MainButton';
import LoginFormInput from '../../components/textInputs/LoginFormInput';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (email == "") {
            Alert.alert("Please enter email");
        }
        else if (password == "") {
            Alert.alert("please enter password");
        }
        else {
            try {
                setLoading(true);
                const userCredential = await auth().signInWithEmailAndPassword(email, password);
                const user = userCredential.user;
                console.log('Logged in user:', user);
                setAsyncStorage("UserID", user.uid);
                setLoading(false);
                navigation.replace("HomeScreen");
            } catch (error) {
                setLoading(false);
                console.error('Login error:', error);
                switch (error.code) {
                    case 'auth/user-not-found':
                        Alert.alert('User not found', 'Please check your email and password.');
                        break;
                    case 'auth/wrong-password':
                        Alert.alert('Invalid password', 'Please check your password.');
                        break;
                    case 'auth/invalid-email':
                        Alert.alert('Invalid email', 'Please enter a valid email address.');
                        break;
                    default:
                        Alert.alert('Login failed', 'An error occurred while logging in. Please try again later.');
                        break;
                }
            }
        }
    };

    return (
        <View style={Styles.container}>
            <Text style={Styles.title}>Login</Text>
            <LoginFormInput value={email} placeHolder={"Email"} secure={false} onChange={(text) => setEmail(text)} />
            <LoginFormInput value={password} placeHolder={"Password"} secure={true} onChange={(text) => setPassword(text)} />
            <MainButton title={"Login"} loading={loading} onPress={() => handleLogin()} />
            <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
                <Text style={Styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
                <Text style={Styles.signupText}>Don't have an account? Sign up here</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginScreen;