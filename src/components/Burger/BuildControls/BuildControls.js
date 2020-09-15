import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'},
];

const buildControls = props => {
  return (
    <div className={classes.BuildControls}>
      <p>Current Price: <strong>₹{props.price}</strong></p>
      {controls.map(ctrl => {
        return <BuildControl 
        key={ctrl.label} 
        label={ctrl.label}
        add={() => props.addIngredient(ctrl.type)}
        remove= {() => props.removeIngredient(ctrl.type)}
        isDisable= {props.disableIngredients[ctrl.type]}/>
      })}
      {props.isAuth 
      ? <button 
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.showSummary}>ORDER NOW</button>
      : <button 
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.login}>Login to Continue</button>}
    </div>
  );
}

export default buildControls;