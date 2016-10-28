import React, { Component, PropTypes } from 'react';
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
          className={`Balance-toggle-logout-button${isLogoutCollapsed ? ' Balance-toggle-logout-button-collapsed' : ''} small-button borderless-button`}
          onClick={onGearClick}
          title={isLogoutCollapsed ? 'Show logout' : 'Hide logout'}>
          <svg className="Balance-gear-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
            <path d="M 28.053176443624363 0 L 35.94682355637564 0 L 37.86768066444777 10.796926552500324 A 22 22 0 0 1 42.84376022905525 12.858086195608351 L 51.8365912971095 6.5817573011704615 L 57.41824269882954 12.1634087028905 L 51.14191380439165 21.156239770944754 A 22 22 0 0 1 53.203073447499676 26.132319335552236 L 64 28.053176443624363 L 64 35.94682355637564 L 53.203073447499676 37.86768066444777 A 22 22 0 0 1 51.14191380439165 42.84376022905525 L 57.41824269882954 51.8365912971095 L 51.8365912971095 57.41824269882954 L 42.84376022905525 51.14191380439165 A 22 22 0 0 1 37.86768066444777 53.203073447499676 L 35.94682355637564 64 L 28.053176443624363 64 L 26.13231933555224 53.203073447499676 A 22 22 0 0 1 21.15623977094475 51.14191380439165 L 12.1634087028905 57.41824269882954 L 6.5817573011704615 51.8365912971095 L 12.858086195608351 42.84376022905525 A 22 22 0 0 1 10.796926552500327 37.867680664447775 L 0 35.94682355637565 L 0 28.05317644362437 L 10.79692655250032 26.132319335552246 A 22 22 0 0 1 12.858086195608351 21.156239770944744 L 6.581757301170455 12.163408702890502 L 12.163408702890493 6.581757301170461 L 21.156239770944747 12.858086195608351 A 22 22 0 0 1 26.132319335552232 10.796926552500324 M 32 20 A 12 12 0 0 0 32 44 A 12 12 0 0 0 32 20"></path>
          </svg>
        </button>
      </div>
    );
  }
}

export default Balance;
