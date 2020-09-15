import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import burgerBuilderReducer from './Store/reducers/burgerBuilder';
import orderReducer from './Store/reducers/order';
import ordersReducer from './Store/reducers/orders';
import authReducer from './Store/reducers/auth';
import delayReducer from './Store/reducers/timeDelay';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  orders: ordersReducer,
  auth: authReducer,
  timeDelay: delayReducer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
<Provider store={store}>
  <BrowserRouter>s
    <App />
  </BrowserRouter>
</Provider>, document.getElementById('root'));
registerServiceWorker();
