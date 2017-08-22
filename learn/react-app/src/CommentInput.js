import React, { Component } from 'react';

class CommentInput extends Component {
  constructor () {
    super();
    this.state = {
      title: '',
      text: ''
    }
  }

  render () {
    return (
      <div className="comment-input">
        <div>
          <input onChange={ this.handleTitle.bind(this) } type="text" value={this.state.title}/>
        </div>
        <div>
          <textarea onChange={ this.handleText.bind(this) } value={this.state.text} name="" id="" cols="30" rows="10"></textarea>
        </div>
        <div>
          <button onClick={ this.handleClick.bind(this) }>Submit</button>
        </div>
      </div>
    );
  }

  handleTitle (e) {
    this.setState({
      title: e.target.value
    })
  }

  handleText (e) {
    this.setState({
      text: e.target.value
    })
  }

  handleClick () {
    if (this.props.handleSubmit && this.state.title !== '' && this.state.text !== '') {
      this.props.handleSubmit(this.state)
    }
  }
}

export default CommentInput;