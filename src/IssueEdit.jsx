import React from 'react';
import {Link} from 'react-router-dom';
class IssueEdit extends React.Component{
  render(){
    return(
      <div>
        <p>IssueEdit {this.props.match.params.id}</p>
        <Link to="/issues">Back to issue list</Link>
      </div>
    )
  }
};
// const IssueEdit = ({match})=> <div>IssueEdit {match.params.id}</div>;
export default IssueEdit;