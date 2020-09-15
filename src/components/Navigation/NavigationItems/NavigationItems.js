import React from 'react';
import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" exact>Burger Builder</NavigationItem>
      {props.isAuth 
      ? <NavigationItem link="/orders">My Orders</NavigationItem>
      : null}
      {props.isAuth 
      ? <NavigationItem link="/logout">Log out</NavigationItem>
      : <NavigationItem link="/login">Log in/Sign up</NavigationItem>}
    </ul>
  );
}

export default navigationItems;