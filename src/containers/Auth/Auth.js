import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {auth} from '../../Store/actions/index';
import {timeDelay} from '../../Store/actions/index';
import Input from '../../components/UI/Form/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import Message from '../../components/UI/Message/Message';
import classes from './Auth.css';

const Auth = props => {

  const [authForm, setAuthForm] = useState(
    {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email ID'
        },
        value: ''
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: ''
      }
    }
  );

  const [isSignup, setIsSignup] = useState(true);

  const inputChangedHandler = (event, element) => {
    event.preventDefault();
    let tempForm = {...authForm};
    tempForm[element].value = event.target.value;
    setAuthForm(tempForm);

  }

  const authHandler = (event) => {
    event.preventDefault();
    props.onAuth(authForm.email.value, authForm.password.value, isSignup);
  }

  const toggleAuthModeHandler = () => {
    setIsSignup(!isSignup);
  }

    let form = [];
    for(let element in authForm){
      form.push(<Input 
      key={element}
      elementType={authForm[element].elementType}
      elementConfig={authForm[element].elementConfig}
      value={authForm[element].value}
      changed={(event) => inputChangedHandler(event, element)}/>)
    }
    //Spinner
    let spinner = null;
    if(props.isLoading)
      spinner = <Spinner/>

    //Auth Message
    let authMessage = null;
    if(props.token)
      authMessage = 
      <div>
        {props.redirect 
        ? <Redirect to={props.redirect}></Redirect>
        : props.onDelay("/")}
        <Message messageType="Success">Authenticated! Redirecting...</Message>
      </div>
    else if(!props.token && props.error)
      authMessage = <Message messageType="Danger">ERROR: {props.error}</Message>

    return (
      <div className={classes.AuthData}>
        {spinner}
        {authMessage}
      <form onSubmit={authHandler}>
          {form}
          <Button btnType="Success">{isSignup? 'Sign Up' : 'Log In'}</Button>
      </form>
        <Button btnType="Danger" click={toggleAuthModeHandler}>Switch to {isSignup ? 'Log In' : 'Sign Up'}</Button>
      </div>
    )
  };

const mapDispatchToProps = dispatch => {
  return{
    onAuth: (email, password, isSignUp) => dispatch(auth(email, password, isSignUp)),
    onDelay: (message) => dispatch(timeDelay(message))
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.auth.isLoading,
    token: state.auth.token,
    error:  state.auth.error,
    redirect: state.timeDelay.message
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);