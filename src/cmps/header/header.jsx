import React from 'react';
import './header.css';

class Header extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
  
  
    render() {
      return (
        <div className="title">
          Movies Task
        </div>
      );
    }
  }

export default Header;
