import React, { Component } from 'react';
import './Nav.css';

class Nav extends Component {
  constructor () {
    super()
    this.state = {
      current: 0,
      navList: ['Home', 'Contact', 'Doc', 'Guide', 'About']
    }
  }

  render () {
    return (
      <div>
        <ul className="nav">
          {
            this.state.navList.map((item, index) => {
              return (
                <li key={index} className={ this.state.current === index ? 'on' : '' } onClick={this.clickHandle.bind(this, index)}>
                  <a href={ '#' + index }>{ item }</a>
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
  
  clickHandle (index) {
    this.setState({
      current: index
    })
  }
}

export default Nav;