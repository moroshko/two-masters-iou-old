import React, { Component, PropTypes } from 'react';
import './Logout.css';

class Logout extends Component {
  static contextTypes = {
    base: PropTypes.object
  };

  static propTypes = {
    email: PropTypes.string.isRequired
  };

  render() {
    const { base } = this.context;
    const { email } = this.props;

    return (
      <div className="Logout-container">
        {email}
        <button
          className="Logout-button"
          type="button"
          onClick={base.unauth}>
          Logout
        </button>
      </div>
    );
  }
}

export default Logout;
