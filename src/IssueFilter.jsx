const React = require('react');
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

class IssueFilter extends React.Component {
  clearFilter = (e) => {
    e.preventDefault();
    this.props.setFilter("");
  };
  setFilterOpen = (e) => {
    e.preventDefault();
    this.props.setFilter( '?status=Open');
  };
  setFilterAssigned = (e) => {
    e.preventDefault();
    this.props.setFilter('?status=Assigned');
  };
  render() {
    const Separator = () => <span> | </span>;
    return (
      <div>
        <a href="#" onClick={this.clearFilter}>All Issues</a>
        <Separator />
        <a href="#" onClick={this.setFilterOpen}>Open Issues</a>
        <Separator />
        <a href="#" onClick={this.setFilterAssigned}>Assigned Issues</a>
      </div>
    )
  }
}
export default IssueFilter;