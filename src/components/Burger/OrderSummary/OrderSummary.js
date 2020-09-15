import React from 'react';
import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button'

const orderSummary = props => {

  const summary = Object.keys(props.ingredients)
                    .map(key => {
                      return (
                      <li key={key}>{key}: {props.ingredients[key]}</li>
                      );
                    })

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients: </p>
      <ul>
        {summary}
      </ul>
      <p><strong>Total Price: ₹{props.price}</strong></p>
      <p>Continue to checkout?</p>
      <Button btnType={'Danger'} click={props.cancel}>CANCEL</Button >
      <Button btnType={'Success'} click={props.continue}>CONTINUE</Button >
    </Aux>
  );
}

export default orderSummary;