import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppTracker = {
  UserID: 'UserID',
};

const setAsyncStorage = async (key, item) => {
  try {
    await AsyncStorage.setItem(key, item);
  } catch (error) {
    console.log(error);
  }
};
const getAsyncStorage = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const RemoveItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    // return true;
  }
  catch (exception) {
    return false;
  }
}

const clearAsyncStorage = async () => {
  try {
    AsyncStorage.clear();
  } catch (error) {
    console.log(error);
    return null;
  }
};
export { setAsyncStorage, getAsyncStorage, clearAsyncStorage, RemoveItem};