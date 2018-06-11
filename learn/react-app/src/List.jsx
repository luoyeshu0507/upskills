import React, { Component } from 'react';

export default class extends Component {
  static defaultProps = {
    data: []
  }

  render () {
    return (
      <div {...this.props}>
        {
          this.props.data.map(item => <span key={item}>{item}</span>)
        }
      </div>
    )
  }
}