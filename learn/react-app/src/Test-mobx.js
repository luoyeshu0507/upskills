import React, { Component } from 'react';

export default class extends Component {
  state = {
    list: [
      {
        num: 1
      },
      {
        num: 2
      },
      {
        num: 3
      },
      {
        num: 4
      }
    ]
  }

  render() {
    return (
      <div className="test-mobx">123</div>
    )
  }
}