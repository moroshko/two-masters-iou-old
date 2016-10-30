import React, { Component, PropTypes } from 'react';
import EditRecord from '../EditRecord/EditRecord';
import { formatRecordDate, shortenLenderOrBorrower } from '../helpers';
import './RecordsItem.css';

class RecordsItem extends Component {
  static propTypes = {
    record: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    onUpdateSuccess: PropTypes.func.isRequired,
    isEdited: PropTypes.bool.isRequired
  };

  storeContainerReference = container => {
    if (container !== null) {
      this.container = container;
    }
  };

  onClick = () => {
    const { record, onClick } = this.props;

    onClick(record);

    // Scroll after the EditRecord form is mounted.
    setTimeout(() => {
      this.container.scrollIntoView({ behavior: 'smooth' });
    });
  };

  renderRecord() {
    const { record, isEdited } = this.props;

    return (
      <div
        className={`RecordsItem-record${isEdited ? ' RecordsItem-record-edited' : ''}`}
        onClick={this.onClick}
        title={isEdited ? 'Click to cancel edit' : 'Click to edit'}
        ref={this.storeContainerReference}>
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
    const { record, onUpdateSuccess, isEdited } = this.props;

    if (isEdited) {
      return (
        <EditRecord record={record} onUpdateSuccess={onUpdateSuccess} />
      );
    }

    return null
  }

  render() {
    return (
      <li className="RecordsItem">
        {this.renderRecord()}
        {this.renderEditForm()}
      </li>
    );
  }
}

export default RecordsItem;
