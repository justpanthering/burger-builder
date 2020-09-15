import React, {useState, useEffect} from 'react';
import axios from '../../axios-orders';
import {connect} from 'react-redux';
import * as actions from '../../Store/actions/index';

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Aux from '../../hoc/Aux/Aux'
import Modal from '../../components/UI/Modal/Modal'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const burgerBuilder = props => {
  const [showSummary, setShowSummary] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if(props.shouldInitIng){
      props.onInitIngredients();
    }
    setShowSummary(false);
    props.onDelayReset();
  }, []);

  const updatePurchaseState = (tempState) =>{
    let tempIngredients = {
      ...tempState
    }
    let sum = Object.keys(tempIngredients)
      .map(key => tempIngredients[key])
      .reduce((sum, el) => {return sum += el},0);
    return(sum<=0 ? false : true);
  }

  const toggleSummaryHandler = () => {
    setShowSummary(!showSummary);
  }

  const continuePurchaseHandler = () => {
    props.onResetPurchaseBurger();
    props.history.push(`/checkout`);
  }

  const loginHandler = () => {
    props.onSetShouldInitIng(false);
    props.history.push(`/login`);
  }

    let disableIngredients = { ...props.ingredients};
    for(let ing in disableIngredients){
      disableIngredients[ing] = disableIngredients[ing] > 0 ? false : true;
    }

    //Loading vs show summary
    let orderSummary = 
    <OrderSummary 
    cancel={toggleSummaryHandler} 
    continue={continuePurchaseHandler} 
    ingredients={props.ingredients} 
    price={props.totalPrice}/>

    if(isLoading)
      orderSummary = <Spinner />

    let burger = <Spinner />
    if(props.ingredients){
      burger =
      <Aux>
        <Modal show={showSummary} closeBackDrop={toggleSummaryHandler}>
            {orderSummary}
        </Modal>
        <Burger ingredients={props.ingredients}/>;
      </Aux> 
    }
    else if(props.error)
      burger = <p>The page can't be loaded. Please try again</p>;

    return(
      <Aux>
        
        {burger}
        <BuildControls 
          addIngredient={props.onAddIngredients}
          removeIngredient={props.onRemoveIngredients}
          disableIngredients={disableIngredients}
          price={props.totalPrice}
          purchasable={updatePurchaseState(props.ingredients)}
          showSummary={toggleSummaryHandler}
          login={loginHandler}
          isAuth={props.isAuth}/>
      </Aux>
    );
  }

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuth: state.auth.token !== null,
    isBuilding: state.burgerBuilder.building,
    hasPurchased: state.order.Purchased,
    shouldInitIng: state.burgerBuilder.shouldInitIng
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredients: ingType => dispatch(actions.addIngredient(ingType)),
    onRemoveIngredients: ingType => dispatch(actions.removeIngredient(ingType)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onDelayReset: () => dispatch(actions.timeDelayReset()),
    onSetShouldInitIng: should => dispatch(actions.shouldInitIng(should)),
    onResetPurchaseBurger: () => dispatch(actions.purchaseBugerReset())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(burgerBuilder, axios));