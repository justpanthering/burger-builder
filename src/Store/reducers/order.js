import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  Purchased: false
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.PURCHASE_BURGER_RESET:
      return {
        ...state,
        Purchased: false
      }
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        Purchased: true
      }
    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        isLoading: false
      }
    default:
      return state;
  }
}

export default reducer;