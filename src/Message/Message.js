import React, { Component, PropTypes } from 'react';
import './Message.css';

class Message extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired
  };

  render() {
    const { message } = this.props;

    return (
      <div className="Message-container">
        {message}
      </div>
    );
  }
}

export default Message;
