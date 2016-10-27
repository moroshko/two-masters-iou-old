import React, { Component, PropTypes } from 'react';
import { formatRecordDate, shortenLenderOrBorrower } from '../helpers';
import './RecordsItem.css';

class RecordsItem extends Component {
  static propTypes = {
    record: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    isEdited: PropTypes.bool.isRequired
  };

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
            {formatRecordDate(record.date)}
          </div>
          <div>
            {shortenLenderOrBorrower(record.lender)}
            <span className="RecordsItem-record-arrow">➝</span>
            {shortenLenderOrBorrower(record.borrower)}
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
