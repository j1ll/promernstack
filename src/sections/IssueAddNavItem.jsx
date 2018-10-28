import React from 'react';
import {Route,  BrowserRouter, Switch, Link, Redirect, withRouter} from 'react-router-dom';
import { Nav, NavItem, NavDropdown,MenuItem, Glyphicon, Modal, Form, FormGroup, FormControl, ControlLabel,
  Button, ButtonToolbar } from 'react-bootstrap';

import Toast from '../Toast.jsx';

class IssueAddNavItem extends React.Component {
  state = {showing: false, toastVisible: false, toastMessage: '', toastType: 'success'};
  
  showModal = () => {
    this.setState({ showing: true });
  };
  
  hideModal = () => {
    this.setState({ showing: false });
  };
  
  showError = (message) => {
    this.setState({ toastVisible: true, toastMessage: message, toastType: 'danger' });
  };
  
  dismissToast = () => {
    this.setState({ toastVisible: false });
  };
  
  submit = (e) => {
    e.preventDefault();
    this.hideModal();
    const form = document.forms.issueAddd;
    const newIssue = {
      owner: form.owner.value, title: form.title.value,
      status: 'New', created: new Date(),
    };
    fetch('/api/issues', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newIssue),
    }).then(response => {
      if (response.ok) {
        response.json().then(updatedIssue => {
          updatedIssue.created = new Date(updatedIssue.created);
          if (updatedIssue.completionDate)
            updatedIssue.completionDate = new Date(updatedIssue.completionDate);
          this.props.history.push({pathname:`/issues/${updatedIssue._id}`});
        });
      } else {
        response.json().then(error => {
          this.showError(`Failed to add issue: ${error.message}`);
        });
      }
    }).catch(err => {
      this.showError(`Error in sending data to server: ${err.message}`);
    });
  };
  
  render() {
    return (
      <Nav pullRight>
        <NavItem onClick={this.showModal}><Glyphicon glyph="plus" /> Create Issue</NavItem>
        <Modal keyboard show={this.state.showing} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Create Issue</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form name="issueAddd">
              <FormGroup>
                <ControlLabel>Title</ControlLabel>
                <FormControl name="title" autoFocus />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Owner</ControlLabel>
                <FormControl name="owner" />
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <ButtonToolbar>
              <Button type="button" bsStyle="primary" onClick={this.submit}>Submit</Button>
              <Button bsStyle="link" onClick={this.hideModal}>Cancel</Button>
            </ButtonToolbar>
          </Modal.Footer>
        </Modal>
        <Toast
          showing={this.state.toastVisible} message={this.state.toastMessage}
          onDismiss={this.dismissToast} bsStyle={this.state.toastType}
        />
        <NavDropdown id="user-dropdown" title={<Glyphicon glyph="option-horizontal"/>} noCaret>
          <MenuItem>Logout</MenuItem>
        </NavDropdown>
      </Nav>
    );
  }
}


export default withRouter(IssueAddNavItem);
