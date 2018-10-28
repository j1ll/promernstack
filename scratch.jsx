
const Header = () => (
  <Panel header="Edit Issue">
    <Form horizontal onSubmit={this.onSubmit}>
      <FormGroup>
        <Col componentClass={ControlLabel} sm={3}>ID</Col>
        <Col sm={9}>
          <FormControl.Static>{issue._id}</FormControl.Static>
        </Col>
      </FormGroup>
      <FormGroup>
        <Col componentClass={ControlLabel} sm={3}>Created</Col>
        <Col sm={9}>
          <FormControl.Static>
            {issue.created ? issue.created.toDateString() : ''}
          </FormControl.Static>
        </Col>
      </FormGroup>
      <FormGroup>
        <Col componentClass={ControlLabel} sm={3}>Status</Col>
        <Col sm={9}>
          <FormControl
            componentClass="select" name="status" value={issue.status}
            onChange={this.onChange}
          >
            <option value="New">New</option>
            <option value="Open">Open</option>
            <option value="Assigned">Assigned</option>
            <option value="Fixed">Fixed</option>
            <option value="Verified">Verified</option>
            <option value="Closed">Closed</option>
          </FormControl>
        </Col>
      </FormGroup>
      <FormGroup>
        <Col componentClass={ControlLabel} sm={3}>Owner</Col>
        <Col sm={9}>
          <FormControl name="owner" value={issue.owner} onChange={this.onChange} />
        </Col>
      </FormGroup>
      <FormGroup>
        <Col componentClass={ControlLabel} sm={3}>Effort</Col>
        <Col sm={9}>
          <FormControl
            componentClass={NumInput} name="effort"
            value={issue.effort} onChange={this.onChange}
          />
        </Col>
      </FormGroup>
      <FormGroup validationState={this.state.invalidFields.completionDate ? 'error' : null}>
        <Col componentClass={ControlLabel} sm={3}>Completion Date</Col>
        <Col sm={9}>
          <FormControl
            componentClass={DateInput} name="completionDate"
            value={issue.completionDate} onChange={this.onChange}
            onValidityChange={this.onValidityChange}
          />
          <FormControl.Feedback />
        </Col>
      </FormGroup>
      <FormGroup>
        <Col componentClass={ControlLabel} sm={3}>Title</Col>
        <Col sm={9}>
          <FormControl name="title" value={issue.title} onChange={this.onChange} />
        </Col>
      </FormGroup>
      <FormGroup>
        <Col smOffset={3} sm={6}>
          <ButtonToolbar>
            <Button bsStyle="primary" type="submit">Submit</Button>
            <LinkContainer to="/issues">
              <Button bsStyle="link">Back</Button>
            </LinkContainer>
          </ButtonToolbar>
        </Col>
      </FormGroup>
    </Form>
    {validationMessage}
  </Panel>
);
export default Header;
class Example extends React.Component {
  constructor(props, context) {
    super(props, context);
    
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    
    this.state = {
      show: false
    };
  }
  
  
  render() {
    const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    const tooltip = <Tooltip id="modal-tooltip">wow.</Tooltip>;
    
    return (
      <div>
        <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
          Launch demo modal
        </Button>
        
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Body>
            <
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

render(<Example />);