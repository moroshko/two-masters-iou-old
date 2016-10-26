import React, { Component, PropTypes } from 'react';
import './Balance.css';

class Balance extends Component {
  static contextTypes = {
    base: PropTypes.object
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
    const levaOwesDanikRounded = Math.round(levaOwesDanik * 100) / 100;

    return (
      <div className="Balance-container">
        {loading ? 'Loading...' : this.renderBalance(levaOwesDanikRounded)}
      </div>
    );
  }
}

export default Balance;
