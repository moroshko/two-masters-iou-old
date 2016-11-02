import React, { Component, PropTypes } from 'react';
import RecordsItem from '../RecordsItem/RecordsItem';
import './Records.css';

const MAX_RECORDS = 100;

class Records extends Component {
  static contextTypes = {
    base: PropTypes.object
  };

  static propTypes = {
    newRecordKey: PropTypes.string
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

  onRecordItemClick = record => {
    const { editRecordKey } = this.state;

    this.setState({
      editRecordKey: record.key === editRecordKey ? null : record.key
    });
  };

  onUpdateSuccess = () => {
    this.setState({
      editRecordKey: null
    });
  };

  render() {
    const { newRecordKey } = this.props;
    const { loading, records, editRecordKey } = this.state;

    return (
      <div className="Records-container">
        {
          loading ?
            'Loading...' :
            <ul className="Records-list">
              {
                // .slice() is important here because .reverse() mutating the array
                records.slice().reverse().map(record => (
                  <RecordsItem
                    record={record}
                    onClick={this.onRecordItemClick}
                    isNew={record.key === newRecordKey}
                    isEdited={record.key === editRecordKey}
                    onUpdateSuccess={this.onUpdateSuccess}
                    key={record.key}
                  />
                ))
              }
            </ul>
        }
      </div>
    );
  }
}

export default Records;
