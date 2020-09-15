import React, {useEffect} from 'react';
import axios from '../../axios-orders';
import {connect} from 'react-redux';

import * as actions from '../../Store/actions/index';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const orders = props => {

  useEffect(() => {  
    props.onGetOrders(props.token, props.userId);
    props.onDelayReset();
  }, []);

    let orders = null;
    if(props.orders.length>0){
      orders = props.orders.map(order => {
        return <Order 
                key={order.id} 
                ingredients={order.order.ingredients}
                totalPrice={order.order.totalPrice}/>
      })
    }
    if(props.isLoading){
      orders = <Spinner />
    }
    return (
    <div>
      {orders}
    </div>
    )
  }

const mapStateToProps = state => {
  return{
    orders: state.orders.orders,
    isLoading: state.orders.isLoading,
    token: state.auth.token,
    userId: state.auth.userID
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetOrders: (token, userId) => dispatch(actions.getOrders(token, userId)),
    onDelayReset: () => dispatch(actions.timeDelayReset())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(orders, axios));