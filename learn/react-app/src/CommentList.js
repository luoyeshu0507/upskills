import React, { Component } from 'react';
import Comment from './Comment';

class CommentList extends Component {
  static defaultProps = {
    list: []
  }

  render () {
    return (
      <div className="comment-list">
        {
          this.props.list.map((item, i) => {
            return <Comment key={ i } data={ item }/>
          })
        }
      </div>
    );
  }
}

export default CommentList;