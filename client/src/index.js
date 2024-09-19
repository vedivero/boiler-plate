import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import { thunk } from 'redux-thunk';
import { createStore } from 'redux';
import Reducer from './_reducers';

const createStoreWithMiddleware = applyMiddleware(
   promiseMiddleware,
   thunk,
)(createStore);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
   <Provider
      store={createStoreWithMiddleware(
         Reducer,
         window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__(),
      )}
   >
      <App />
   </Provider>,
);
