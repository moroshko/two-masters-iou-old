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

  render() {
    const { loading, levaOwesDanik } = this.state;

    return (
      <div className="Balance-container">
        Balance: {loading ? 'Loading...' : levaOwesDanik}
      </div>
    );
  }
}

export default Balance;
