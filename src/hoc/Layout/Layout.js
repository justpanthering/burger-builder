import React, {useState} from 'react';
import {connect} from 'react-redux';

import classes from './Layout.css'
import Toolbar from '../../components/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

import Aux from '../Aux/Aux'

const layout = props => {

  const [showSideDrawer, setSideDrawerVisibility] = useState(false);

  const toggleSideDrawerHandler = () => {
    setSideDrawerVisibility(!showSideDrawer);
  }
    return (
      <Aux>
        <Toolbar 
        click={toggleSideDrawerHandler}
        isAuth={props.isAuth}/>
        <SideDrawer 
        show={showSideDrawer}
        toggle={toggleSideDrawerHandler}
        isAuth={props.isAuth}/>
        <main className={classes.Content}>
          {props.children}
        </main>
      </Aux>
    );
}

const mapStateToProps = (state) => {
  return{
    isAuth: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(layout);