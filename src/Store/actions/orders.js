import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';

export const getOrdersSuccess = (ordersData) => {
  return {
    type: actionTypes.GET_ORDERS_SUCCESS,
    data: ordersData
  }
}
export const getOrdersFail = () => {
  return {
    type: actionTypes.GET_ORDERS_FAIL
  }
}
export const getOrders = (token, userId) => {
  return dispatch => {
    //Asynchronous code here
    // this.setState({isLoading: true});
    dispatch({type: actionTypes.GET_ORDERS})
    const queryParams = '?auth=' + token + '&orderBy="userID"&equalTo="'+userId+'"';
    axios.get('/orders.json' + queryParams)
    .then(response => {
      dispatch(getOrdersSuccess(response.data));
    })
    .catch(error => {
      dispatch(getOrdersFail());
      // this.setState({isLoading: false});
    })
  }
}