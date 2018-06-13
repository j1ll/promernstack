import React from 'react';
import ReactDOM from 'react-dom';
import {Route,  BrowserRouter, Switch, Link, Redirect, withRouter} from 'react-router-dom';
import IssueList from "./IssueList.jsx";
import NoMatch from "./NoMatch.jsx";
import IssueEdit from "./IssueEdit.jsx";

const RoutedApp = () => (
  <BrowserRouter> 
    <Switch>
      <Redirect exact from="/" to="/issues" />
      <Route path="/issues/:id" component={IssueEdit} />
      <Route path="/issues" component={withRouter(IssueList)} />
      <Route path="*" component={NoMatch} />
    </Switch>
  </BrowserRouter>
);
ReactDOM.render(
  <RoutedApp />,
  document.getElementById('mount-point')
);
if (module.hot) module.hot.accept();