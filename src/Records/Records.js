import React, { Component, PropTypes } from 'react';
import './Records.css';

const MAX_RECORDS = 100;

class Records extends Component {
  static contextTypes = {
    base: PropTypes.object
  };

  constructor() {
    super();

    this.state = {
      loading: false,
      records: []
    };
  }

  componentDidMount() {
    const { base } = this.context;

    this.setState({
      loading: true
    });

    this.ref = base.syncState('records', {
      context: this,
      state: 'records',
      asArray: true,
      queries: {
        orderByChild: 'date',
        limitToLast: MAX_RECORDS
      },
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

  renderRecord(record) {
    return (
      <li key={record.key}>
        {record.date}
      </li>
    );
  }

  render() {
    const { loading, records } = this.state;

    return (
      <div className="Records-container">
        {
          loading ?
            'Loading...' :
            <ul>
              {records.reverse().map(this.renderRecord)}
            </ul>
        }
      </div>
    );
  }
}

export default Records;
