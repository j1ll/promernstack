import React from 'react';
import PropTypes from 'prop-types';
import {Table, Button, Glyphicon, Panel} from 'react-bootstrap';
import {stringify,parse} from 'query-string';
import Toast from './Toast.jsx';
import IssueFilter from './IssueFilter.jsx';
import IssueTable from './IssueTable.jsx';
import IssueAdd from './IssueAdd.jsx';
class IssueList extends React.Component {
  formatIssue = (issue) => {
    issue.created = new Date(issue.created);
    if (issue.completionDate) issue.completionDate = new Date(issue.completionDate);
    return issue;
  };
  state = {
    
    issues: this.props.records.map(record=> this.formatIssue(Object.assign({},record))),
    toastVisible: false, 
    toastMessage: '', 
    toastType: 'success',
  };
  
  createIssue = (newIssue) =>{
    fetch('/api/issues', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newIssue),
    }).then(response => {
      if (response.ok) {
        response.json().then(updatedIssue => {
          this.formatIssue(updatedIssue);
          const newIssues = this.state.issues.concat(updatedIssue);
          this.setState({ issues: newIssues });
        });
      }else {
        response.json().then(error => {
          this.showError("Failed to add issue: " + error.message)
        });
      }
    }).catch(err => {
      this.showError("Error in sending data to server: " + err.message);
    });
  };
  setFilter = (query) => {
    console.dir({ pathname: this.props.location.pathname, search: stringify(query) });
    this.props.history.push({ pathname: this.props.location.pathname, search: stringify(query) });
  };
  showError = (message) => {
    this.setState({toastVisible: true, toastMessage: message, toastType:"danger"})
  };
  dismissToast = () => {
    this.setState({toastVisible: false})
  };
  createTestIssue = () => {
    this.createIssue({
      status: 'New', owner: 'Pieta', created: new Date(),
      title: 'Completion date should be optional',
    });
  };
  componentDidMount() {
    this.loadData();
  }
  
  componentDidUpdate(prevProps, prevState) {
    const oldQuery = prevProps.location.search;
    const newQuery = this.props.location.search;
    console.log(`${oldQuery}     ${newQuery}`);
    if (oldQuery === newQuery) {
      return;
    }
    this.loadData();
  }
  
  deleteIssue = (id)=>{
    fetch(`/api/issues/${id}`,{method:'DELETE'}).then(response => {
      if(!response.ok) this.showError("Failed to delete issue: "+id);
      else this.loadData();
    })
  };
  loadData() {
    fetch(`/api/issues${this.props.location.search}`).then(response => {
      if (response.ok) {
        response.json().then(data => {
          console.log("Total count of records:", data._metadata.total_count);
          data.records.forEach(issue => {this.formatIssue(issue)});
          this.setState({ issues: data.records });
        });
      } else {
        response.json().then(error => {
          this.showError("Failed to fetch issues:" + error.message)
        });
      }
    }).catch(err => {
      this.showError("Error in fetching data from server:", err);
    });
  }
  render() {
    return (
      <div>
        <Panel id="collapsible-panel-example-2" defaultExpanded>
          <Panel.Heading>
            <Panel.Title toggle>
              Filter
            </Panel.Title>
          </Panel.Heading>
          <Panel.Collapse>
            <Panel.Body>
              <IssueFilter setFilter={this.setFilter} initFilter={parse(this.props.location.search)} />
            </Panel.Body>
          </Panel.Collapse>
        </Panel>
        <IssueTable issues={this.state.issues} deleteIssue={this.deleteIssue}/>
        <IssueAdd createIssue={this.createIssue}/>
        <Toast showing={this.state.toastVisible} message={this.state.toastMessage}
          onDismiss={this.dismissToast} bsStyle={this.state.toastType}/>
      </div>
    )
  };
    
};
IssueList.propTypes = {
  location: PropTypes.object.isRequired,
};
export default IssueList;