import React, { Component, PropTypes } from 'react';
import './Records.css';

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
      <li>
        {record.amount}
      </li>
    );
  }

  render() {
    const { loading, records } = this.state;

    console.log(records);

    return (
      <div className="Records-container">
        {
          loading ?
            'Loading...' :
            <ul>
              {/*records.map(this.renderRecord)*/}
            </ul>
        }
      </div>
    );
  }
}

export default Records;
