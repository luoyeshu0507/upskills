import React, { Component } from 'react';
import TestRefChild from './TestRefChild';

export default class extends Component {
  state = {
    text: ''
  }

  render() {
    return (
      <div>
        <TestRefChild text={this.state.text}/>
        <br />
        {this.state.text}
        <input type="text" onChange={this.setText}/>
      </div>
    );
  }

  setText = (e) => {
    this.setState({
      text: e.target.value
    });
  }
}