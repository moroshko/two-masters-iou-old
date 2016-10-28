import React, { Component, PropTypes } from 'react';
import './Balance.css';

class Balance extends Component {
  static contextTypes = {
    base: PropTypes.object
  };

  static propTypes = {
    isLogoutCollapsed: PropTypes.bool.isRequired,
    onProfileIconClick: PropTypes.func.isRequired
  };

  constructor() {
    super();

    this.state = {
      loading: false,
      levaOwesDanik: null
    };
  }

  componentDidMount() {
    const { base } = this.context;

    this.setState({
      loading: true
    });

    this.ref = base.syncState('levaOwesDanik', {
      context: this,
      state: 'levaOwesDanik',
      then() {
        this.setState({
          loading: false
        });
      }
    });
  }

  componentWillUnmount() {
    const { base } = this.context;

    base.removeBinding(this.ref);
  }

  renderBalance(levaOwesDanikRounded) {
    if (levaOwesDanikRounded === 0) {
      return 'All good!'
    }

    if (levaOwesDanikRounded > 0) {
      return `Leva owes Danik: $${levaOwesDanikRounded}`;
    }

    return `Danik owes Leva: $${-levaOwesDanikRounded}`;
  }

  render() {
    const { loading, levaOwesDanik } = this.state;
    const { isLogoutCollapsed, onProfileIconClick } = this.props;
    const levaOwesDanikRounded = Math.round(levaOwesDanik * 100) / 100;

    return (
      <div className="Balance-container">
        {loading ? 'Loading...' : this.renderBalance(levaOwesDanikRounded)}
        <button
          className={`Balance-toggle-logout-button${isLogoutCollapsed ? ' Balance-toggle-logout-button-collapsed' : ''} small-button borderless-button`}
          onClick={onProfileIconClick}
          title={isLogoutCollapsed ? 'Show logout' : 'Hide logout'}>
          <svg className="Balance-profile-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
            <path d="M53 13.1c-21 9.5-21.3 39.3-.5 49.4 2.2 1 6.8 2.1 10.3 2.3 5.5.4 7.1.1 12.7-2.7 11-5.4 16.2-14.5 15.3-26.5C89.6 21 78.7 11 64 11c-4.4 0-8 .7-11 2.1zM40 76.8c-5.7 5.7-8.8 9.8-10.9 14.3-2.6 5.6-5.1 15.8-5.1 21.1 0 1.7 2.6 1.8 40 1.8s40-.1 40-1.8c0-5.2-2.4-15.5-4.9-20.7-2.7-5.9-11.7-16.6-17-20.4-2.6-1.9-2.8-1.9-8.1-.1-8.1 2.8-14.8 2.4-24.3-1.5-1.3-.5-3.6 1.2-9.7 7.3z"/>
          </svg>
        </button>
      </div>
    );
  }
}

export default Balance;
