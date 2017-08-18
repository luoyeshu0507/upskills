import React, { Component } from 'react';

class Comment extends Component {
  static defaultProps = {
    data: {
      title: '',
      text: ''
    }
  }
  render () {
    return (
      <div className="comment">
        { this.props.data.title }: { this.props.data.text }
      </div>
    );
  }
}

export default Comment;