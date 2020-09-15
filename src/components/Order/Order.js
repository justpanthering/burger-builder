import React from 'react';

import classes from './Order.css'

const order = props => {
  let ingArr = [];
  for(let ing in props.ingredients){
    ingArr.push(`${ing}-${props.ingredients[ing]}`)
  }
  return(
    <div className={classes.Order}>
      <p>Ingredients: {ingArr.join(', ')}</p>
      <p>Total Price: <strong>INR {props.totalPrice}</strong></p>
    </div>
  );
}

export default order;