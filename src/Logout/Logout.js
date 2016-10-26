import React, { Component, PropTypes } from 'react';
import './Logout.css';

class Logout extends Component {
  static contextTypes = {
    base: PropTypes.object
  };

  static propTypes = {
    isCollapsed: PropTypes.bool.isRequired,
    email: PropTypes.string.isRequired
  };

  render() {
    const { base } = this.context;
    const { isCollapsed, email } = this.props;

    return (
      <div className={`Logout-container${isCollapsed ? ' Logout-container-collapsed' : ''}`}>
        {email}
        <button
          className="Logout-button small-button"
          type="button"
          onClick={base.unauth}>
          Logout
        </button>
      </div>
    );
  }
}

export default Logout;
