import React, {useState} from 'react';
import {connect} from 'react-redux';

import {purchaseBurgerStart, shouldInitIng} from '../../../Store/actions/index';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Form/Input/Input';

const contactData = props => {
  const [orderForm, setOrderForm] = useState(
    {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email'
        },
        value: ''
      },
      address1: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Address Line 1'
        },
        value: ''
      },
      address2: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Address Line 2'
        },
        value: ''
      },
      city: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'City'
        },
        value: ''
      },
      state: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'State'
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: ''
      },
      pin: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Pin'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'fastest'},
            {value: 'cheapest', displayValue: 'cheapest'}
          ]
        },
        value: 'fastest'
      },
    }
  )

  const placeOrderHandler = (event) => {
    event.preventDefault();
    const order = {
      ingredients: props.ingredients,
      totalPrice: props.totalPrice,
      customer: {
      name: orderForm.name.value,
      email: orderForm.email.value,
      address: {
        address1: orderForm.address1.value,
        address2: orderForm.address2.value,
        city: orderForm.city.value,
        state: orderForm.state.value,
        country: orderForm.country.value,
        pin: orderForm.pin.value,
        deliveryMethod: orderForm.deliveryMethod.value,
        }
      },
      userID: props.userID
    }
    props.onSetShouldInitIng(true);
    props.onPurchaseStart(order, props.token);
  }

  const inputChangedHandler = (event, element) => {
    event.preventDefault();
    let tempForm = {...orderForm};
    tempForm[element].value = event.target.value;
    setOrderForm(tempForm);
  }

    let form = [];
    for(let element in orderForm){
      form.push(<Input 
      key={element}
      elementType={orderForm[element].elementType}
      elementConfig={orderForm[element].elementConfig}
      value={orderForm[element].value}
      changed={(event) => inputChangedHandler(event, element)}/>)
    }
    let contactForm = (
        <form onSubmit={placeOrderHandler}>
          {form}
          <Button btnType="Success">Place Order</Button>
        </form>
    );
    if(props.isLoading){
      contactForm = (<Spinner />);
    }
    return(
      <div className={classes.ContactData}>
        <h4>Enter your contact details...</h4>
        {contactForm}
      </div>
    )
  }

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    isLoading: state.order.isLoading,
    token: state.auth.token,
    userID: state.auth.userID
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPurchaseStart: (order, token) => dispatch(purchaseBurgerStart(order, token)),onSetShouldInitIng: should => dispatch(shouldInitIng(should))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(contactData);