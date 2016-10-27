import React, { Component, PropTypes } from 'react';
import './RecordsItem.css';

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

class RecordsItem extends Component {
  static propTypes = {
    record: PropTypes.object.isRequired
  };

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

  render() {
    const { record } = this.props;

    return (
      <li className="RecordsItem" key={record.key}>
        <div className="RecordsItem-line1">
          <div>
            {this.renderDate(record.date)}
          </div>
          <div>
            {this.shortenLenderOrBorrower(record.lender)}
            <span className="RecordsItem-arrow">➝</span>
            {this.shortenLenderOrBorrower(record.borrower)}
          </div>
        </div>
        <div className="RecordsItem-line2">
          <div>
            {record.description}
          </div>
          <div className="RecordsItem-amount">
            ${record.amount}
          </div>
        </div>
      </li>
    );
  }
}

export default RecordsItem;
