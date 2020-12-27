import AsyncStorage from '@react-native-community/async-storage';

export const getUpdateToken = async () => {
  try {
    const value = await AsyncStorage.getItem('@update_token');
    console.log(value)
    if (value !== null) {
      return value;
    }
  } catch (e) {
    return null;
  }
};

export const getSessionToken = async () => {
  try {
    const value = await AsyncStorage.getItem('@session_token');
    if (value !== null) {
      return value;
    }
  } catch (e) {
    return null;
  }
};

export const setUpdateToken = async (token) => {
  try {
    await AsyncStorage.setItem('@update_token', token);
  } catch (e) {
    return null;
  }
};

export const setSessionToken = async (token) => {
  try {
    await AsyncStorage.setItem('@session_token', token);
  } catch (e) {
    return null;
  }
};