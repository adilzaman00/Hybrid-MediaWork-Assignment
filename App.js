import React from 'react';
import { View, Text } from 'react-native';
import Navigation from './src/navigation/Navigation';
import {enableScreens} from 'react-native-screens';

enableScreens();

const App = () => {
  return (
    <>
    <Navigation  />
    </>
  )
}

export default App;