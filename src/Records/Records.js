import React, { Component, PropTypes } from 'react';
import RecordsItem from '../RecordsItem/RecordsItem';
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
      records: [],
      editRecordKey: null
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

  render() {
    const { loading, records } = this.state;

    return (
      <div className="Records-container">
        {
          loading ?
            'Loading...' :
            <ul className="Records-list">
              {
                records.reverse().map(record => (
                  <RecordsItem record={record} />
                ))
              }
            </ul>
        }
      </div>
    );
  }
}

export default Records;
