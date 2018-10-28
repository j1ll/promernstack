import React from 'react';
import Context from '../Context.jsx';
import Button from './Button.jsx';
export default class Testik extends React.Component{
  render(){return(
    <Context.Consumer>
      {context => <Button {...this.props} theme={context.theme} />}
    </Context.Consumer>
  )}
}