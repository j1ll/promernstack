import React from 'react';
import {Nav, Navbar, NavItem, NavDropdown, MenuItem, Glyphicon} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import IssueAddNavItem from './IssueAddNavItem.jsx';
const Header = () => (
  <Navbar fluid>
    <Navbar.Header>
      <Navbar.Brand>Issue Tracker</Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <LinkContainer to="/issues">
        <NavItem>Issues</NavItem>
      </LinkContainer>
      <LinkContainer to="/reports">
        <NavItem>Reports</NavItem>
      </LinkContainer>
    </Nav>
    <IssueAddNavItem/>
  </Navbar>
);
export default Header;