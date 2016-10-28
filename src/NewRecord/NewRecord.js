import React, { Component, PropTypes } from 'react';
import RecordForm from '../RecordForm/RecordForm';
import { getToday, isRecordValid, getLevaOwesDanikDiff } from '../helpers';
import './NewRecord.css';

class NewRecord extends Component {
  static contextTypes = {
    base: PropTypes.object
  };

  constructor() {
    super();

    this.state = {
      lender: null,
      borrower: null,
      amount: '',
      description: '',
      date: getToday(),
      loading: false,
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

  createNewRecord = event => {
    event.preventDefault();

    this.setState({
      loading: true,
      error: null
    });

    const { base } = this.context;
    const { lender, borrower, amount, description, date } = this.state;
    const newRecord = {
      lender: lender,
      borrower: borrower,
      amount: parseFloat(amount.trim()),
      description: description.trim(),
      date: date
    };

    base.push('records', { data: newRecord })
      .then(() => {
        base.database().ref('/levaOwesDanik')
          .transaction(levaOwesDanik => levaOwesDanik + getLevaOwesDanikDiff(newRecord), error => {
            this.setState({
              lender: null,
              borrower: null,
              amount: '',
              description: '',
              date: getToday(),
              loading: false,
              error: error ? 'Something went wrong' : null
            });
          });
      })
      .catch(error => {
        this.setState({
          lender: null,
          borrower: null,
          amount: '',
          description: '',
          date: getToday(),
          loading: false,
          error: 'Something went wrong'
        });
      });
  };

  render() {
    const { lender, borrower, amount, description, date, loading, error } = this.state;

    return (
      <form className="NewRecord-container" onSubmit={this.createNewRecord}>
        <RecordForm
          id="new-record"
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
        <div className="NewRecord-footer">
          {
            loading ?
              'Creating...' :
              <button
                className="small-button"
                type="submit"
                disabled={!isRecordValid(this.state)}>
                Create New Record
              </button>
          }
          {
            error ?
              <span className="NewRecord-error error-message">{error}</span> :
              null
          }
        </div>
      </form>
    );
  }
}

export default NewRecord;
