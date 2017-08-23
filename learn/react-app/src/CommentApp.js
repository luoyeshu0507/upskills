import React, { Component } from 'react';
import CommentInput from './CommentInput';
import CommentList from './CommentList';

class CommentApp extends Component {
  constructor () {
    super();
    console.log('CommentApp constructor');
    this.state = {
      commentList: []
    }
  }

  componentWillMount () {
    console.log('CommentApp componentWillMount');
  }

  componentDidMount () {
    console.log('CommentApp componentWillMount');
  }
  
  render () {
    console.log('CommentApp render');
    return (
      <div className="comment-app">
        <CommentInput handleSubmit={ this.handleSubmit.bind(this) }/>
        <CommentList list={ this.state.commentList }/>
      </div>
    );
  }

  handleSubmit (comment) {
    this.state.commentList.push(comment)
    this.setState({
      commentList: this.state.commentList
    })
  }
}

export default CommentApp;