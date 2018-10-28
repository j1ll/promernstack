import React from 'react';
export default class Button extends React.Component{
  render(){
    return(
      <div>
        <span>{this.props.theme}</span><button>{this.props.theme.toUpperCase()}</button>
      </div>
    )
  }
}