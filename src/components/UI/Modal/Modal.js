import React from 'react';

import classes from './Modal.css'
import Backdrop from '../Backdrop/Backdrop'
import Aux from '../../../hoc/Aux/Aux'

const modal = props => {
  // shouldComponentUpdate(nextProps, nextState){
  //   //if change is props.showSummary, then render the ShowSummary
  //   if(nextProps.show!== props.show || nextProps.children !== props.children){
  //     return true;
  //   }
  //   else
  //     return false;
  // }

    return (
      <Aux>
        <Backdrop show={props.show} closeBackDrop={props.closeBackDrop}/>
        <div 
        className={classes.Modal}
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0'
        }}>
          {props.children}
        </div>
      </Aux>
    );
  };

export default React.memo(
  modal, 
  (prevProps, nextProps) => 
    nextProps.show === prevProps.show && nextProps.children === prevProps.children
  );