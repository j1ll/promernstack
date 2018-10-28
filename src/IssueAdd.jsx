const React = require('react');
import {Form, FormControl, Button} from 'react-bootstrap';
class IssueAdd extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    var form = document.forms.issueAdd;
    this.props.createIssue({
      owner: form.owner.value,
      title: form.title.value,
      status: 'New',
      created: new Date(),
    });
    // clear the form for the next input
    form.owner.value = ""; form.title.value = "";
  };
  render() {
    return (
      <div>
        <Form inline name="issueAdd" onSubmit={this.handleSubmit}>
          <FormControl name="owner" placeholder="Owner"/>{' '}
          <FormControl name="title" placeholder="Title"/>{' '}
          <Button type="submit" bsStyle="primary">Add</Button>
        </Form>
      </div>
    )
  }
}
export default IssueAdd;