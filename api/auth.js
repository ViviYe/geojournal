import {setUpdateToken, setSessionToken} from "./token"
import AsyncStorage from '@react-native-community/async-storage';

const BASE_URL = 'https://geojournal.herokuapp.com/'

const success = (value) => {
  return new Promise((resolve) => {resolve(value);
  });
};

const failure = (value) => {
  return new Promise((resolve, reject) => {
    reject(value);
  });
};

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem("@session_id")
      .then((res) => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((err) => reject(err));
  });
};

export const login = async (e, pwd) => {
  return fetch(`${BASE_URL}login/`,
  {
    method: "POST",
    body: JSON.stringify({
      email: e,
      password: pwd,
    })
  }).then(res => res.json())
  .then(async data =>{
    console.log(data)
    if (data.error){
      return failure(data)
    }
    else {
    await setUpdateToken(data.updateToken);
    await setSessionToken(data.sessionToken);
    return success(data)
    }
  })
  }

export const register = async (e, pwd) => {
  return fetch(`${BASE_URL}register/`,
  {
    method: "POST",
    body: JSON.stringify({
      email: e,
      password: pwd,
      user_id:"user_id",
      device_id: "device_id",
      device_type: "iOS" 
    })
  }).then(res => res.json())
  .then(async data =>{
    console.log(data)
    if (data.error){
      return failure(data)
    }
    else {
    await setUpdateToken(data.updateToken);
    await setSessionToken(data.sessionToken);
    return success(data)
    }
  })
}

export const logout = () => {
    AsyncStorage.removeItem('@update_token');
    AsyncStorage.removeItem('@session_token');
    }
