import React from 'react';

import classes from './Input.css'

const input = props => {
  let inputElement = null;
  switch(props.elementType){
    case 'text':
      inputElement = <input className={classes.InputElement} 
      type="text" 
      {...props.elementConfig} 
      value={props.value}/>;
      break;
    case 'textarea':
      inputElement = <input className={classes.InputElement} 
      type="textarea" 
      {...props.elementConfig} 
      value={props.value}
      onChange={props.changed}/>;
      break;
    case 'select':
      inputElement = (
      <select 
      className={classes.InputElement}
      value={props.value}
      onChange={props.changed}>
        {props.elementConfig.options.map(option => {
          return (
            <option 
            key={option.value}
            value={option.value}>
              {option.displayValue}
            </option>
          )
        })}
      </select>
        );
      break;
    default:
      inputElement = <input 
      className={classes.InputElement} 
      type="text" {...props.elementConfig} 
      value={props.value}
      onChange={props.changed}/>;
  }
  return(
    <div className={classes.Input}>
      {inputElement}
    </div>
  );
}

export default input;