import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';

export const purchaseBurgerSuccess = (order) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    order: order
  }
}
export const purchaseBurgerFail = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL
  }
}


export const purchaseBurgerStart = (orderData, token) => {
  return dispatch => {
    dispatch({type: actionTypes.PURCHASE_BURGER_START})
    axios.post('/orders.json?auth='+token, orderData)
    .then(response => {
      if(response){
        dispatch(purchaseBurgerSuccess(response.data));
      }
    })
    .catch(error => {
      dispatch(purchaseBurgerFail());
    })
  };
}
export const purchaseBugerReset = () => {
  console.log('resetting');
  return {type: actionTypes.PURCHASE_BURGER_RESET}
}