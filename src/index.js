import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";

////////////Redux/////////////////////////////////////
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import reducer from './store/reducer';
import thunk from 'redux-thunk';

const logger=(store)=>{
  return (next)=>{
      return (action)=>{
          console.log('Dispatching',action);
          const result=next(action);
          console.log('Next state',store.getState());
          return result;
      };
  };
};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;// for Redux Devtool
export const store=createStore(reducer, composeEnhancers(applyMiddleware(logger, thunk)));
////////////Redux/////////////////////////////////////

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
