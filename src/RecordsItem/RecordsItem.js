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
    record: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    isEdited: PropTypes.bool.isRequired
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

  onClick = () => {
    const { record, onClick } = this.props;

    onClick(record);
  };

  renderRecord() {
    const { record, isEdited } = this.props;

    return (
      <div
        className={`RecordsItem-record${isEdited ? ' RecordsItem-record-edited' : ''}`}
        onClick={this.onClick}
        title={isEdited ? 'Click to cancel edit' : 'Click to edit'}>
        <div className="RecordsItem-record-line1">
          <div>
            {this.renderDate(record.date)}
          </div>
          <div>
            {this.shortenLenderOrBorrower(record.lender)}
            <span className="RecordsItem-record-arrow">➝</span>
            {this.shortenLenderOrBorrower(record.borrower)}
          </div>
        </div>
        <div className="RecordsItem-record-line2">
          <div>
            {record.description}
          </div>
          <div className="RecordsItem-record-amount">
            ${record.amount}
          </div>
        </div>
      </div>
    );
  }

  renderEditForm() {
    return (
      <div>
        Edit form here
      </div>
    );
  }

  render() {
    const { isEdited } = this.props;

    return (
      <li className="RecordsItem">
        {this.renderRecord()}
        {isEdited ? this.renderEditForm() : null}
      </li>
    );
  }
}

export default RecordsItem;
