const React = require('react');
import {Link} from 'react-router-dom';
import {Button, Glyphicon} from 'react-bootstrap';
class IssueRow extends React.Component {
  render() {
    const issue = this.props.issue;
    
    const onDeleteClick = () => {
      console.dir(this.props);
      this.props.deleteIssue(this.props.issue._id);
    };
    return (
      <tr>
        <td><Link to={`/issues/${issue._id}`}>{issue._id}</Link></td>
        <td>{issue.status}</td>
        <td>{issue.owner}</td>
        <td>{issue.created.toDateString()}</td>
        <td>{issue.effort}</td>
        <td>{issue.completionDate ? issue.completionDate.toDateString() : ''}</td>
        <td>{issue.title}</td>
        <td>
          <Button onClick={onDeleteClick} bsSize="xsmall"><Glyphicon glyph="trash" /></Button>
        </td>
      </tr>
    )
  }
}

export default IssueRow;