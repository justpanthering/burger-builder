import * as actionTypes from './actionTypes';

export const delay = (message) =>{
    return {type: actionTypes.DELAY, message: message}
}

export const timeDelay = (message) => {
  return dispatch => {
    setTimeout(()=> dispatch(delay(message)), 2*1000);
  }
}

export const timeDelayReset = () => {
  return {
    type: actionTypes.DELAY_RESET
  }
}