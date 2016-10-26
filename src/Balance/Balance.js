import React, { Component, PropTypes } from 'react';
import gearIcon from './gear-icon.svg';
import './Balance.css';

class Balance extends Component {
  static contextTypes = {
    base: PropTypes.object
  };

  static propTypes = {
    isLogoutCollapsed: PropTypes.bool.isRequired,
    onGearClick: PropTypes.func.isRequired
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
    const { isLogoutCollapsed, onGearClick } = this.props;
    const levaOwesDanikRounded = Math.round(levaOwesDanik * 100) / 100;

    return (
      <div className="Balance-container">
        {loading ? 'Loading...' : this.renderBalance(levaOwesDanikRounded)}
        <button
          className={`Balance-toggle-logout-button${isLogoutCollapsed ? ' Balance-toggle-logout-button-collapsed' : ''} small-button`}
          onClick={onGearClick}
          title={isLogoutCollapsed ? 'Show logout' : 'Hide logout'}>
          <img className="Balance-gear-icon" src={gearIcon} alt="Toggle logout" />
        </button>
      </div>
    );
  }
}

export default Balance;
