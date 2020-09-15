import * as actionTypes from '../actions/actionTypes';

const INGREDIENT_PRICE = {
  cheese: 10,
  bacon: 15,
  salad: 7,
  meat: 17
}

const initialState = {
  ingredients: null,
  totalPrice: 0,
  error: false,
  shouldInitIng: true
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.ADD_INGREDIENT:
      return{
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientType]: state.ingredients[action.ingredientType] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientType]
      };
    case actionTypes.REMOVE_INGREDIENT:
      return{
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientType]: state.ingredients[action.ingredientType] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientType]
      };
    case actionTypes.SET_INGREDIENT:
      return{
        ...state,
        ingredients: {
          ...action.ingredients,
        },
        totalPrice: calcPrice(action.ingredients),
        error: false
      };
    case actionTypes.FAILED_INIT_INGREDIENTS:
      return{
        ...state,
        error: true
      };
    case actionTypes.SHOULD_INIT_INGREDIENTS:
      return{
        ...state,
        shouldInitIng: action.should
      };
      default:
        return state
  }
}

const calcPrice = (ingredients) => {
  let sum = 70;
  Object.keys(ingredients).forEach(ing => {
    sum += INGREDIENT_PRICE[ing];
  })
  return sum;
}

export default reducer;