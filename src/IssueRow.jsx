const React = require('react');
import {Link} from 'react-router-dom';
class IssueRow extends React.Component {
  render() {
    const issue = this.props.issue;
    return (
      <tr>
        <td><Link to={`/issues/${issue._id}`}>{issue._id}</Link></td>
        <td>{issue.status}</td>
        <td>{issue.owner}</td>
        <td>{issue.created.toDateString()}</td>
        <td>{issue.effort}</td>
        <td>{issue.completionDate ? issue.completionDate.toDateString() : ''}</td>
        <td>{issue.title}</td>
      </tr>
    )
  }
}

export default IssueRow;