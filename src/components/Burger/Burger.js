import React from 'react';

import BurgerIngredients from './BurgerIngredients/BurgerIngredients';
import classes from './Burger.css';

const burger = props => {

  let ingredientsJSX = Object.keys(props.ingredients).map(igKey => {
    return [...Array(props.ingredients[igKey])].map((_, i) => {
      return <BurgerIngredients key={igKey + i} type={igKey} />
    })
  });

  //EXPLANATION: 
  /*
  props.ingredients: {
      cheese: 1,
      bacon: 2,
      salad: 1,
      meat: 1
    }

    ingredientsJSX = [
      [<BurgerIngredients type="cheese"/>], 
      [<BurgerIngredients type="bacon"/>, <BurgerIngredients type="bacon"/>], 
      [<BurgerIngredients type="salad"/>], 
      [<BurgerIngredients type="meat"/>]
    ]
  */

  //Transform array of arrays into a simple array
  //arrOfArr = [arr, arr, arr]
  //arr_Out = arr_Out.concat(arr)...for each arr
  ingredientsJSX = ingredientsJSX.reduce((arr_Out, arr) => {
    return arr_Out.concat(arr);
  }, [])

  if(ingredientsJSX.length === 0){
    ingredientsJSX = <p>Please add ingredients to the Burger!</p>
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredients type="bread-top"/>
      {ingredientsJSX}
      <BurgerIngredients type="bread-bottom"/>
    </div>
  );
}

export default burger;