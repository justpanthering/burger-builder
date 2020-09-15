import React from 'react';
import classes from './Message.css'

const message = (props) => {
  return (
    <p className={[classes.Message, classes[props.messageType]].join(' ')}>{props.children}</p>
  )
}

export default message;