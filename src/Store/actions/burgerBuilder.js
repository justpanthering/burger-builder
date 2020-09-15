import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const calcPrice = ingredients => {
  return {
    type: actionTypes.CALC_PRICE, 
    ingredients: ingredients
  }
}
export const addIngredient = ingType => {
  return {
    type: actionTypes.ADD_INGREDIENT, 
    ingredientType: ingType
  }
}
export const removeIngredient = ingType => {
  return {
    type: actionTypes.REMOVE_INGREDIENT, 
    ingredientType: ingType
  }
}
export const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENT,
    ingredients: ingredients
  }
}
export const failedInitIngredients = () => {
  return {
    type: actionTypes.FAILED_INIT_INGREDIENTS
  }
}
export const initIngredients = () => {
  return dispatch => {
    //Asynchronous code
    axios.get('https://react-my-burger-353ef.firebaseio.com/ingredients.json')
    .then(response => {
      dispatch(setIngredients(response.data))
    })
    .catch(error => {
      dispatch(failedInitIngredients());
    })
  }
}
export const shouldInitIng = should => {
  return ({type: actionTypes.SHOULD_INIT_INGREDIENTS, should: should})
}