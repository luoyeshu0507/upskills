import React, { Component } from 'react';

export default class extends Component {
  static defaultProps = {
    text: ''
  }

  render() {
    return (
      <div ref="myelement">
      </div>
    );
  }

  componentDidMount = () => {
    this.xxx = 123;
    console.log('componentDidMount', this.props.text);
    this.refs.myelement.innerHTML = this.props.text
  }

  componentWillReceiveProps = (nextProps) => {
    this.refs.myelement.innerHTML = nextProps.text;
  }

  shouldComponentUpdate = () => {
    console.log('shouldComponentUpdate')
    console.log(this.xxx);
    return true;
  }

  componentWillUpdate = () => {
    console.log('componentWillUpdate')
  }

  componentDidUpdate = () => {
    console.log('componentDidUpdate')
  }
}