import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './Nav';
import Hello from './Hello';
import CommentApp from './CommentApp';
import TestMobx from './Test-mobx';
import List from './List';

class App extends Component {
  state = {
    list: [1, 2, 3, 4]
  }

  render() {
    return (
      <div className="App">
        <Nav/>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React!</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload. 
        </p>
        <Hello text="Hello world"/>
        <CommentApp/>
        <TestMobx/>
        <List onClick={ this.modifyList.bind(this) } data={ this.state.list }/>
      </div>
    );
  }

  modifyList() {
    this.setState({
      list: this.state.list.splice(1)
    })
  }
}

export default App;
