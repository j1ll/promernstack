import React from 'react';
import ReactDOM from 'react-dom';

import {Route,  BrowserRouter, Switch, Link, Redirect, withRouter} from 'react-router-dom';
import {Nav, Navbar, NavItem, NavDropdown, MenuItem, Glyphicon} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

import Header from './Header.jsx';
import IssueList from "./IssueList.jsx";
import IssueEdit from "./IssueEdit.jsx";
const NoMatch = () => <p>Page Not Found</p>;
const RoutedWithApp = () => (
  <BrowserRouter> 
    <Route path="/">
      <div>
        <Header/>
        <div className="container-fluid">
          <Switch>
            <Redirect exact from="/" to="/issues" />
            <Route path="/issues/:id" component={IssueEdit} />
            <Route path="/issues" component={withRouter(IssueList)} />
            <Route path="*" component={NoMatch} />
          </Switch>
          <hr/>
          <h5><small>
            Full source code available at this <a href="https://github.com/vasansr/pro-mern-stack">
            GitHub repository</a>.
          </small></h5>
        </div>
      </div>
      
    </Route>
  </BrowserRouter>
);
const RoutedApp = () => (
  <BrowserRouter>
    <Route path="/">
      <App>
        <Switch>
          <Redirect exact from="/" to="/issues" />
          <Route path="/issues/:id" component={IssueEdit} />
          <Route path="/issues" component={withRouter(IssueList)} />
          <Route path="*" component={NoMatch} />
        </Switch>
      </App>
    </Route>
  </BrowserRouter>
);
const App = (props) => (
<div>
  <Header/>
  <div className="container-fluid">
    {props.children}
    <hr/>
    <h5><small>
      Full source code available at this <a href="https://github.com/vasansr/pro-mern-stack">
      GitHub repository</a>.
    </small></h5>
  </div>
</div>
);
export default RoutedApp;