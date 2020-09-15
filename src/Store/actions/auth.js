import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return{
    type: actionTypes.AUTH_START
  }
}

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  return {
    type: actionTypes.LOGOUT
  }
}

export const checkAuthTimeout = (timeout) => {
  console.log(timeout);
  return dispatch => {
    setTimeout(() => {dispatch(logout())}, timeout * 1000);
  }
}

export const authSuccess = (authData) => {
  console.log(authData)
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: authData.data.idToken,
    userID: authData.data.localId,
  }
}
export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error.data.error.message
  }
}

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    }
    let postURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBVwxJ0UPdBVsxCJ7VVTrqKbFKh60hIKLk';
    if(!isSignUp)
      postURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBVwxJ0UPdBVsxCJ7VVTrqKbFKh60hIKLk';
    //Async code
    axios.post(postURL, authData)
    .then( response => {
      //Store data in local storage
      localStorage.setItem('token', response.data.idToken);
      localStorage.setItem('expirationDate', new Date(new Date().getTime() + response.data.expiresIn * 1000));

      dispatch(authSuccess(response));
      dispatch(checkAuthTimeout(response.data.expiresIn))
    })
    .catch(error => {
      console.log(error.response);
      dispatch(authFail(error.response));
    })
  }
}

export const checkAuthStatus = () => {
  return dispatch => {
  
  const token = localStorage.getItem('token');
  const expirationDate = localStorage.getItem('expirationDate');

  if(token && (new Date() < new Date(expirationDate))){
    console.log('valid');
    //get userID from server
    const postData = {
      idToken: token
    }
    axios.post('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBVwxJ0UPdBVsxCJ7VVTrqKbFKh60hIKLk', postData)
    .then(response => {
      console.log(response.data.users[0].localId);
      const userID = response.data.users[0].localId;
      const authData = {
        data: {
          idToken: token,
          localId: userID
        }
      };
      console.log(authData);
      dispatch(authSuccess(authData));
      dispatch(checkAuthTimeout(((new Date(expirationDate)).getTime() - (new Date()).getTime())/1000))
    })
    .catch(error => {
      dispatch(authFail(error.response));
    })
  }
  else{
      dispatch(logout());
  }
  }
}