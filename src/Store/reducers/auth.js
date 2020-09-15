import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  userID: null,
  error: null,
  isLoading: false
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.AUTH_START:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: action.token,
        userID: action.userID,
        error: null,
        isLoading: false
      }
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        token: null,
        userID: null,
        error: action.error,
        isLoading: false
      }
    case actionTypes.LOGOUT:
      return {
        ...state,
        token: null,
        userID: null,
        error: null,
        isLoading: false
      }
    default:
      return state;
  }
}

export default reducer;