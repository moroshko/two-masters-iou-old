import React, { Component, PropTypes } from 'react';
import RecordForm from '../RecordForm/RecordForm';
import { isRecordValid, getLevaOwesDanikDiff } from '../helpers';
import './EditRecord.css';

class EditRecord extends Component {
  static contextTypes = {
    base: PropTypes.object
  };

  static propTypes = {
    record: PropTypes.object.isRequired
  };

  constructor({ record }) {
    super();

    const { lender, borrower, amount, description, date } = record;

    this.state = {
      lender: lender,
      borrower: borrower,
      amount: String(amount),
      description: description,
      date: date,
      loadingSave: false,
      loadingDelete: false,
      error: null
    };
  }

  onLenderChange = lender => {
    this.setState({
      lender: lender,
      borrower: null
    });
  };

  onBorrowerChange = borrower => {
    this.setState({
      borrower: borrower
    });
  };

  onAmountChange = event => {
    this.setState({
      amount: event.target.value
    });
  };

  onDescriptionChange = event => {
    this.setState({
      description: event.target.value
    });
  };

  onDateChange = event => {
    this.setState({
      date: event.target.value
    });
  };

  saveRecord = event => {
    event.preventDefault();

    this.setState({
      loadingSave: true,
      error: null
    });

    const { base } = this.context;
    const { lender, borrower, amount, description, date } = this.state;
    const { key } = this.props.record;
    const editedRecord = {
      lender: lender,
      borrower: borrower,
      amount: parseFloat(amount.trim()),
      description: description.trim(),
      date: date
    };

    console.log('saving ', key);
  };

  deleteRecord = () => {
    this.setState({
      loadingDelete: true,
      error: null
    });

    const { base } = this.context;
    const recordToDelete = Object.assign({}, this.props.record);
    const { key } = recordToDelete;

    // https://github.com/tylermcginnis/re-base/issues/145
    base.database().ref(`records/${key}`).remove()
      .then(() => {
        // On success, we shouldn't update the state, because this component
        // will be unmounted, and React would throw an error.
        base.database().ref('/levaOwesDanik')
          .transaction(levaOwesDanik => levaOwesDanik - getLevaOwesDanikDiff(recordToDelete), error => {
            if (error) {
              this.setState({
                loadingDelete: false,
                error: 'Something went wrong'
              });
            }
          });
      })
      .catch(error => {
        this.setState({
          loadingDelete: false,
          error: 'Something went wrong'
        });
      });
  };

  renderSaveButton = () => {
    const { loadingSave } = this.state;

    if (loadingSave) {
      return 'Saving...';
    }

    return (
      <button
        className="small-button"
        type="submit"
        disabled={!isRecordValid(this.state)}>
        Save
      </button>
    );
  };

  renderDeleteButton = () => {
    const { loadingDelete, amount } = this.state;

    if (loadingDelete) {
      return 'Deleting...';
    }

    if (amount.trim() !== '') {
      return null;
    }

    return (
      <button
        className="small-button borderless-button"
        type="button"
        title="Delete record"
        onClick={this.deleteRecord}>
        <svg className="EditRecord-trash-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M205.9 30c-10.7 1.9-22.2 9.3-28.1 18.1-2 3-8.2 16.5-13.9 30.1L153.7 103H61.3l-2.4 2.6c-2.3 2.4-2.4 3.2-2.4 15.6v13l2.8 2.4c2.7 2.3 3.4 2.4 18.3 2.4H93v139.5c0 155.4-.3 148 6.8 162.5 4.7 9.5 14.2 19.5 22.7 23.6l6 2.9 126.9.3c110.8.2 127.6 0 132.2-1.3 10.8-3.1 22.8-15.1 28.8-28.8 5.8-12.9 5.6-8.3 5.6-159.7V139h15.4c14.9 0 15.6-.1 18.3-2.4l2.8-2.4v-13c0-12.4-.1-13.2-2.4-15.6l-2.4-2.6h-45.8c-35.3 0-45.9-.3-46.6-1.3-.6-.6-5.7-12.4-11.4-26.2-7-16.9-11.6-26.5-14.2-29.7-4.3-5.5-11.8-10.8-19.8-14.1-5.3-2.1-6.3-2.2-55.4-2.4-27.5 0-52.1.2-54.6.7zm100 37.7c1.8 1.5 15.1 31.8 15.1 34.4 0 .5-27.5.9-63.5.9-35.2 0-63.5-.4-63.5-.9 0-2.3 13.5-32.8 15.2-34.4 1.9-1.6 5.6-1.7 48.3-1.7 42.6 0 46.4.1 48.4 1.7zm79.6 210.8v139l-2.3 5c-1.3 2.7-3.3 6-4.4 7.2l-2.1 2.3H138.3l-2.2-2.4c-1.2-1.3-3.1-4.6-4.1-7.5-2-5-2-8.6-2-144.1V139l127.8.2 127.7.3v139z"/>
          <path d="M168.9 196.9l-2.9 3 .2 86 .3 86 2.3 2.3c2 2.1 3.4 2.3 12.8 2.6 14.1.5 17-.1 19.5-4.1 1.9-3.1 1.9-5.3 1.7-88.5l-.3-85.4-2.8-2.4c-2.6-2.3-3.5-2.4-15.3-2.4h-12.6l-2.9 2.9zM242.3 196.4l-2.8 2.4v173.1l2.3 2.3c2.1 2.2 3 2.3 15.7 2.3s13.6-.1 15.7-2.3l2.3-2.3V198.8l-2.8-2.4c-2.6-2.3-3.5-2.4-15.2-2.4s-12.6.1-15.2 2.4zM316.7 195.1c-4.7 2.7-4.7 2.7-4.7 90.4 0 67.9.2 83.2 1.4 85.9 2 4.9 5.4 5.8 19.1 5.4 11.4-.3 11.7-.4 14.1-3.1l2.4-2.8V199.8l-2.9-2.9c-2.9-2.9-3-2.9-15.3-2.9-6.9 0-13.1.5-14.1 1.1z"/>
        </svg>
      </button>
    );
  };

  renderError = () => {
    const { error } = this.state;

    if (error === null) {
      return null;
    }

    return (
      <div className="EditRecord-error error-message">
        {error}
      </div>
    );
  };

  render() {
    const { lender, borrower, amount, description, date } = this.state;
    const { record } = this.props;

    return (
      <form className="EditRecord-container" onSubmit={this.saveRecord}>
        <RecordForm
          id={`record-${record.key}`}
          lender={lender}
          onLenderChange={this.onLenderChange}
          borrower={borrower}
          onBorrowerChange={this.onBorrowerChange}
          amount={amount}
          onAmountChange={this.onAmountChange}
          description={description}
          onDescriptionChange={this.onDescriptionChange}
          date={date}
          onDateChange={this.onDateChange}
        />
        <div className="EditRecord-footer">
          <div className="EditRecord-footer-buttons-container">
            {this.renderSaveButton()}
            {this.renderDeleteButton()}
          </div>
          {this.renderError()}
        </div>
      </form>
    );
  }
}

export default EditRecord;
