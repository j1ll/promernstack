import React from 'react';
import PropTypes from 'prop-types';
import IssueFilter from './IssueFilter.jsx';
import IssueTable from './IssueTable.jsx';
import IssueAdd from './IssueAdd.jsx';
class IssueList extends React.Component {
  state = {issues: []};
  createIssue = (newIssue) =>{
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
          const newIssues = this.state.issues.concat(updatedIssue);
          this.setState({ issues: newIssues });
        });
      }else {
        response.json().then(error => {
          alert("Failed to add issue: " + error.message)
        });
      }
    }).catch(err => {
      alert("Error in sending data to server: " + err.message);
    });
  };
  setFilter = (query) => {
    this.props.history.push({ pathname: this.props.location.pathname, search: query });
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
    if (oldQuery === newQuery) {
      return;
    }
    this.loadData();
  }
  
  
  loadData() {
    fetch(`/api/issues${this.props.location.search}`).then(response => {
      if (response.ok) {
        response.json().then(data => {
          console.log("Total count of records:", data._metadata.total_count);
          data.records.forEach(issue => {
            issue.created = new Date(issue.created);
            if (issue.completionDate)
              issue.completionDate = new Date(issue.completionDate);
          });
          this.setState({ issues: data.records });
        });
      } else {
        response.json().then(error => {
          alert("Failed to fetch issues:" + error.message)
        });
      }
    }).catch(err => {
      alert("Error in fetching data from server:", err);
    });
  }
  render() {
    return (
      <div>
        <h1>Issue Trackerrrr</h1>
        <IssueFilter setFilter={this.setFilter}  />
        <hr />
        <IssueTable issues={this.state.issues} />
        <hr />
        <IssueAdd createIssue={this.createIssue}/>
      </div>
    )
  };
    
};
IssueList.propTypes = {
  location: PropTypes.object.isRequired,
};
export default IssueList;