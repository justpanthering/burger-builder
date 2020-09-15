import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  isLoading: false
}

const reducer = (state = initialState, action) => {
  switch(action.type){

    case actionTypes.GET_ORDERS_SUCCESS:
      let orders = [];
      for(let orderID in action.data){
        let order = {
          id: orderID,
          order: action.data[orderID]
        }
        orders.push(order)
      }
      return{
        ...state,
        orders: [...orders],
        isLoading: false
      }
    
    case actionTypes.GET_ORDERS_FAIL:
      return{
        ...state,
        isLoading: false
      }

    case actionTypes.GET_ORDERS:
      return{
        ...state,
        isLoading: true
      }
    default: return state
  }
}

export default reducer;