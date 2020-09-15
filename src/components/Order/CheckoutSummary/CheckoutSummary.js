import React from 'react'

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css'

const checkoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We Hope It Tastes Delicious!!!</h1>
      <div>
        <Burger ingredients={props.ingredients}/>
      </div>
      <Button click={props.continue} btnType="Success">Continue</Button>
      <Button click={props.cancel} btnType="Danger">Cancel</Button>
    </div>
  );

}

export default checkoutSummary;