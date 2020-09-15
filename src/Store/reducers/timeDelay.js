import * as actionTypes from '../actions/actionTypes';

const initialState = {
  message: ""
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.DELAY:
      return {
        ...state,
        message: action.message
      }
    case actionTypes.DELAY_RESET:
      return {
        ...state,
        message: ""
      }
    default:
      return state;
  }
}

export default reducer;