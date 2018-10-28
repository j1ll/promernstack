import React from 'react';
import ReactDOM from 'react-dom';

import {Route,  BrowserRouter, Switch, Link, Redirect, withRouter} from 'react-router-dom';
import {Nav, Navbar, NavItem, NavDropdown, MenuItem, Glyphicon} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import Header from './sections/Header.jsx';
import Footer from './sections/Footer.jsx';
import IssueList from "./IssueList2.jsx";
import IssueEdit from "./IssueEdit.jsx";
const NoMatch = () => <p>Page Not Found</p>;

class RoutedApp extends React.Component{
  render(){
    const recrds = this.props;
    return(
      <Route path="/">
        <div>
          <Header/>
          <div className="container-fluid">
            <Switch>
              <Redirect exact from="/" to="/issues" />
              <Route path="/issues/:id" render={props=>(
                <IssueEdit  issue={this.props.records[0]} {...props}/>
              )}/>
              <Route path="/issues" render={props=>(
                <IssueList records={this.props.records} {...props}/>
              )} />
              <Route path="*" component={NoMatch} />
            </Switch>
          </div>
          <Footer/>
        </div>
      </Route>
  )}
};
export default RoutedApp;
// export default AZAZ;


