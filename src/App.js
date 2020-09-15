import React, { useEffect } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import * as actions from './Store/actions/index';

import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'

const app = props => {
  
  useEffect(() => {
    props.onAuthCheck();
  }, []);

    let route = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder}/>
        <Route path="/login" component={Auth}/>
        <Redirect to="/" />
      </Switch>
    );
    if(props.isAuth){
      route = (
        <Switch>
            <Route path="/" exact component={BurgerBuilder}/>
            {!props.isBuilding ? <Route path="/checkout" component={Checkout}/> : null}
            <Route path="/orders" component={Orders}/>
            <Route path="/login" component={Auth}/>
            <Route path="/logout" component={Logout}/>
            <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <div>
        <Layout>
          {route}
        </Layout>
      </div>
    );
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthCheck: () => dispatch(actions.checkAuthStatus())
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token,
    isBuilding: state.burgerBuilder.building
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(app);
