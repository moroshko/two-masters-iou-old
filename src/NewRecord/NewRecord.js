import React, { Component, PropTypes } from 'react';
import './NewRecord.css';

const amountRegex = /^\d+(\.\d{1,2})?$/;

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
      date: this.getToday(),
      loading: false,
      error: null
    };
  }

  getToday() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    return `${year}-${month < 10 ? `0${month}` : month}-${day}`;
  }

  onLenderChangeToLeva = () => {
    this.setState({
      lender: 'leva',
      borrower: null
    });
  };

  onLenderChangeToDanik = () => {
    this.setState({
      lender: 'danik',
      borrower: null
    });
  };

  onLenderChangeTo2Masters = () => {
    this.setState({
      lender: '2masters',
      borrower: null
    });
  };

  onBorrowerChangeToLeva = () => {
    this.setState({
      borrower: 'leva'
    });
  };

  onBorrowerChangeToDanik = () => {
    this.setState({
      borrower: 'danik'
    });
  };

  onBorrowerChangeTo2Masters = () => {
    this.setState({
      borrower: '2masters'
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

  getLevaOwesDanikDiff(newRecord) {
    if (newRecord.lender === '2masters' && newRecord.borrower === 'danik') {
      return -newRecord.amount / 2;
    }

    if (newRecord.lender === '2masters' && newRecord.borrower === 'leva') {
      return newRecord.amount / 2;
    }

    if (newRecord.lender === 'leva' && newRecord.borrower === '2masters') {
      return -newRecord.amount / 2;
    }

    if (newRecord.lender === 'danik' && newRecord.borrower === '2masters') {
      return newRecord.amount / 2;
    }

    if (newRecord.lender === 'leva' && newRecord.borrower === 'danik') {
      return -newRecord.amount;
    }

    if (newRecord.lender === 'danik' && newRecord.borrower === 'leva') {
      return newRecord.amount;
    }

    return 0;
  }

  addNewRecord = event => {
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
    const levaOwesDanikDiff = this.getLevaOwesDanikDiff(newRecord);

    base.push('records', {
      data: newRecord,
      then: error => {
        base.database().ref('/levaOwesDanik')
          .transaction(levaOwesDanik => levaOwesDanik + levaOwesDanikDiff, error => {
            this.setState({
              lender: null,
              borrower: null,
              amount: '',
              description: '',
              date: this.getToday(),
              loading: false,
              error: error === null ? null : 'Something went wrong'
            });
          });
      }
    })
  };

  isAmountValid(amount) {
    const trimmedAmount = amount.trim();

    return amountRegex.test(trimmedAmount) && parseFloat(trimmedAmount) !== 0;
  }

  isDateValid(date) {
    const timestamp = Date.parse(date);

    return !isNaN(timestamp) &&
      timestamp > 1420070400000 && // new Date('2015-01-01').getTime()
      timestamp < 3313526400000;   // new Date('2075-01-01').getTime()
  }

  render() {
    const { lender, borrower, amount, description, date, loading, error } = this.state;
    const isValid =
      lender !== null &&
      borrower !== null &&
      this.isAmountValid(amount) &&
      description.trim() !== '' &&
      this.isDateValid(date);

    return (
      <form className="NewRecord-container" onSubmit={this.addNewRecord}>
        <div className="NewRecord-lender-and-borrower-container">
          <div className="NewRecord-lender-container">
            <div>
              <button
                className={`NewRecord-lender-button big-button${lender === 'leva' ? ' NewRecord-lender-selected': ''}`}
                type="button"
                onClick={this.onLenderChangeToLeva}>
                Leva
              </button>
            </div>
            <div>
              <button
                className={`NewRecord-lender-button big-button${lender === 'danik' ? ' NewRecord-lender-selected': ''}`}
                type="button"
                onClick={this.onLenderChangeToDanik}>
                Danik
              </button>
            </div>
            <div>
              <button
                className={`NewRecord-lender-button big-button${lender === '2masters' ? ' NewRecord-lender-selected': ''}`}
                type="button"
                onClick={this.onLenderChangeTo2Masters}>
                2 Masters
              </button>
            </div>
          </div>
          <div className="NewRecord-arrow">
            →
          </div>
          <div className="NewRecord-borrower-container">
            <div>
              <button
                className={`NewRecord-borrower-button big-button${borrower === 'leva' ? ' NewRecord-borrower-selected': ''}`}
                type="button"
                onClick={this.onBorrowerChangeToLeva}
                disabled={lender === 'leva'}>
                Leva
              </button>
            </div>
            <div>
              <button
                className={`NewRecord-borrower-button big-button${borrower === 'danik' ? ' NewRecord-borrower-selected': ''}`}
                type="button"
                onClick={this.onBorrowerChangeToDanik}
                disabled={lender === 'danik'}>
                Danik
              </button>
            </div>
            <div>
              <button
                className={`NewRecord-borrower-button big-button${borrower === '2masters' ? ' NewRecord-borrower-selected': ''}`}
                type="button"
                onClick={this.onBorrowerChangeTo2Masters}
                disabled={lender === '2masters'}>
                2 Masters
              </button>
            </div>
          </div>
        </div>

        <div className="NewRecord-text-fields-container">
          <div className="field-container">
            <label className="NewRecord-label" htmlFor="new-record-amount">
              Amount:
            </label>
            <input
              id="new-record-amount"
              className="NewRecord-input"
              type="text"
              value={amount}
              onChange={this.onAmountChange}
              autoComplete="off"
              spellCheck="false"
            />
          </div>
          <div className="field-container">
            <label className="NewRecord-label" htmlFor="new-record-description">
              Description:
            </label>
            <input
              id="new-record-description"
              className="NewRecord-input"
              type="text"
              value={description}
              onChange={this.onDescriptionChange}
              autoComplete="off"
              spellCheck="false"
            />
          </div>
          <div className="field-container">
            <label className="NewRecord-label" htmlFor="new-record-date">
              Date:
            </label>
            <input
              id="new-record-date"
              className="NewRecord-input"
              type="date"
              value={date}
              onChange={this.onDateChange}
            />
          </div>
        </div>
        <div className="NewRecord-footer">
          {
            loading ?
              'Loading...' :
              <button
                className="small-button"
                type="submit"
                disabled={!isValid}>
                Add
              </button>
          }
          {
            error ?
              <span className="NewRecord-sorry error-message">{error}</span> :
              null
          }
        </div>
      </form>
    );
  }
}

export default NewRecord;