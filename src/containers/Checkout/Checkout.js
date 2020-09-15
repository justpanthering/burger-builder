import React from 'react';
import {Route , Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {timeDelay} from '../../Store/actions/index';

import Message from '../../components/UI/Message/Message';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const checkout = props => {


  const continuePurchaseHandler = () => {
    props.history.replace('/checkout/contact-data');
  }
  const cancelPurchaseHandler = () => {
    props.history.goBack();
  }

    let redirect = null;
    if(props.purchased){
      redirect = (
      <div>
        <Message messageType="Success">Order Successful! Redirecting...</Message>
        {props.redirect ? <Redirect to={props.redirect}/> : props.onDelay("/orders")}
      </div>
      )

    }
    

    return (
    <div>
      {redirect}
      <CheckoutSummary 
      continue={continuePurchaseHandler} 
      cancel={cancelPurchaseHandler} 
      ingredients={props.ingredients}/>
      <Route 
      path={`${props.match.path}/contact-data`} 
      component={ContactData}
      />
  </div>
    )
  };

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    purchased: state.order.Purchased,
    redirect: state.timeDelay.message
  }
}

const mapDispatchToProps = dispatch => {
  return{ 
    onDelay: (message) => dispatch(timeDelay(message)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(checkout);