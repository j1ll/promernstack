const React = require('react');
// import PropTypes from 'prop-types';
// import {Link} from 'react-router-dom';
import { Col, Row, FormGroup, FormControl, ControlLabel, InputGroup,
  ButtonToolbar, Button } from 'react-bootstrap';

class IssueFilter extends React.Component {
  state = {
    status: this.props.initFilter.status || '',
    effort_gte: this.props.initFilter.effort_gte || '',
    effort_lte: this.props.initFilter.effort_lte || '',
    changed: false,
  };
  
  componentWillReceiveProps(newProps) {
    this.setState({
      status: newProps.initFilter.status || '',
      effort_gte: newProps.initFilter.effort_gte || '',
      effort_lte: newProps.initFilter.effort_lte || '',
      changed: false,
    });
  }
  clearFilter = () => {
    // e.preventDefault();
    this.props.setFilter({});
  };
  onChangeStatus = (e) => {
    this.setState({ status: e.target.value, changed: true });
  };
  onChangeEffortGte = (e) => {
    const effortString = e.target.value;
    if (effortString.match(/^\d*$/)) {
      this.setState({ effort_gte: e.target.value, changed: true });
    }
  };
  onChangeEffortLte = (e) => {
    const effortString = e.target.value;
    if (effortString.match(/^\d*$/)) {
      this.setState({ effort_lte: e.target.value, changed: true });
    }
  };
  applyFilter = () => {
    const newFilter = {};
    if (this.state.status) newFilter.status = this.state.status;
    if (this.state.effort_gte) newFilter.effort_gte = this.state.effort_gte;
    if (this.state.effort_lte) newFilter.effort_lte = this.state.effort_lte;
    this.props.setFilter(newFilter);
  };
  resetFilter = () => {
    this.setState({
      status: this.props.initFilter.status || '',
      effort_gte: this.props.initFilter.effort_gte || '',
      effort_lte: this.props.initFilter.effort_lte || '',
      changed: false,
    });
  };

  render() {
    return (
      <Row>
        <Col xs={6} sm={4} md={3} lg={2}>
          <FormGroup>
            <ControlLabel>Status</ControlLabel>
            <FormControl  componentClass="select" value={this.state.status} onChange={this.onChangeStatus}>
              <option value="">(Any)</option>
              <option value="New">New</option>
              <option value="Open">Open</option>
              <option value="Assigned">Assigned</option>
              <option value="Fixed">Fixed</option>
              <option value="Verified">Verified</option>
              <option value="Closed">Closed</option>
            </FormControl>
          </FormGroup>
        </Col>
        <Col xs={6} sm={4} md={3} lg={2}>
          <FormGroup>
            <ControlLabel>Effort</ControlLabel>
            <InputGroup>
              <FormControl value={this.state.effort_gte} onChange={this.onChangeEffortGte} />
              <InputGroup.Addon>&nbsp;-&nbsp;</InputGroup.Addon>
              <FormControl value={this.state.effort_lte} onChange={this.onChangeEffortLte} />
            </InputGroup>
          </FormGroup>
        </Col>
        <Col xs={6} sm={4} md={3} lg={2}>
          <FormGroup>
            <ControlLabel>&nbsp;</ControlLabel>
            <ButtonToolbar>
              <Button bsStyle="primary" onClick={this.applyFilter}>Apply</Button>
              <Button onClick={this.resetFilter} disabled={!this.state.changed}>Reset</Button>
              <Button onClick={this.clearFilter}>Clear</Button>
            </ButtonToolbar>
          </FormGroup>
        </Col>
      </Row>
     
    )
  }
}
export default IssueFilter;