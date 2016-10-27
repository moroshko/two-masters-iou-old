import React, { Component, PropTypes } from 'react';
import './Records.css';

const MAX_RECORDS = 100;
const MONTHS = {
  '01': 'Jan',
  '02': 'Feb',
  '03': 'Mar',
  '04': 'Apr',
  '05': 'May',
  '06': 'Jun',
  '07': 'Jul',
  '08': 'Aug',
  '09': 'Sep',
  '10': 'Oct',
  '11': 'Nov',
  '12': 'Dec'
};

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

  renderDate(date) {
    const currentYear = (new Date()).getFullYear();
    const month = MONTHS[date.slice(5, 7)];
    const day = date.slice(8, 10);

    if (date.startsWith(currentYear)) {
      return `${day} ${month}`;
    }

    const year = date.slice(0, 4);

    return `${day} ${month}, ${year}`;
  }

  shortenLenderOrBorrower(lenderOrBorrower) {
    switch (lenderOrBorrower) {
      case 'leva': return 'L';
      case 'danik': return 'D';
      case '2masters': return '2M';
      default: return '?';
    }
  }

  renderRecord = record => {
    return (
      <li className="Records-list-item" key={record.key}>
        <div className="Records-list-item-line1">
          <div className="Records-list-item-date">
            {this.renderDate(record.date)}
          </div>
          <div>
            {this.shortenLenderOrBorrower(record.lender)}
            <span className="Records-list-item-arrow">➝</span>
            {this.shortenLenderOrBorrower(record.borrower)}
          </div>
        </div>
        <div className="Records-list-item-line2">
          <div className="Records-list-item-description">
            {record.description}
          </div>
          <div className="Records-list-item-amount">
            ${record.amount}
          </div>
        </div>
      </li>
    );
  };

  render() {
    const { loading, records } = this.state;

    return (
      <div className="Records-container">
        {
          loading ?
            'Loading...' :
            <ul className="Records-list">
              {records.reverse().map(this.renderRecord)}
            </ul>
        }
      </div>
    );
  }
}

export default Records;
