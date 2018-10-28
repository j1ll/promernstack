import React from 'react';
export default class DateInput extends React.Component {
  state = { value: this.editFormat(this.props.value), focused: false, valid: true };
  componentWillReceiveProps(newProps) {
    if(newProps.value !== this.props.value) this.setState({ value: this.editFormat(newProps.value) });
  }
  
  onFocus = (e) => {
    this.setState({focused:true});
  };
  onBlur = (e) => {
    const value = this.unformat(this.state.value);
    const valid = this.state.value===''|| value!=null;
    if (valid !== this.state.valid && this.props.onValidityChange) {
      this.props.onValidityChange(e, valid);
    }
    this.setState({ focused: false, valid });
    if (valid) this.props.onChange(e, value);
  };
  
  onChange= (e) => {
    if (e.target.value.match(/^[\d-]*$/)) {
      this.setState({ value: e.target.value });
    }
  };
  
  displayFormat(date) {
    return (date != null) ? date.toDateString() : '';
  }
  
  editFormat(date) {
    return (date != null) ? date.toISOString() : '';
  }
  
  unformat(str) {
    if(str==='') return (null);
    const val = new Date(str);
    return isNaN(val.getTime()) ? null : val;
  }
  render() {
    const childProps = Object.assign({}, this.props);
    delete childProps.onValidityChange;
    // const className = (!this.state.valid && !this.state.focused) ? 'invalid' : null;
    const value = (this.state.focused || !this.state.valid) ? this.state.value
      : this.displayFormat(this.props.value);
    return (
      <input
        type="text" {...childProps} value={value}
        placeholder={this.state.focused ? 'yyyy-mm-dd' : null}
        onFocus={this.onFocus} onBlur={this.onBlur} onChange={this.onChange}
      />
    );
  }
  
}