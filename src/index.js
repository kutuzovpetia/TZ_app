import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebaseConfig from './firebase-config';
import firebase from 'firebase';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers/reducer.js';

firebase.initializeApp(firebaseConfig);
const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);

