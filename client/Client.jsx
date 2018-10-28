import React from 'react';
import {Route,  BrowserRouter, Switch, Link, Redirect, withRouter} from 'react-router-dom';
import ReactDOM from 'react-dom';
import App from '../src/App.jsx'

ReactDOM.render(
  <BrowserRouter>
    <App {...window.__INITIAL_STATE__}/>
  </BrowserRouter>
  ,
  document.getElementById('mount-point')
);
