import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import {UserContextProvider} from './context/UserContext'
import './scss/main.scss'

ReactDOM.render(
  <UserContextProvider>
    <App />
  </UserContextProvider>,
  document.getElementById('root')
);

