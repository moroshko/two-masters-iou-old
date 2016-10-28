import React, { Component, PropTypes } from 'react';
import { getToday, isAmountValid, isDescriptionValid, isDateValid } from '../helpers';
import './RecordForm.css';

class RecordForm extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    lender: PropTypes.string,
    onLenderChange: PropTypes.func.isRequired,
    borrower: PropTypes.string,
    onBorrowerChange: PropTypes.func.isRequired,
    amount: PropTypes.string,
    onAmountChange: PropTypes.func.isRequired,
    description: PropTypes.string,
    onDescriptionChange: PropTypes.func.isRequired,
    date: PropTypes.string,
    onDateChange: PropTypes.func.isRequired
  };

  static defaultProps = {
    lender: null,
    borrower: null,
    amount: '',
    description: '',
    date: getToday()
  };

  constructor(props) {
    super();

    this.state = {
      isAmountDirty: false,
      isDescriptionDirty: false
    };

    this.onLenderChangeToLeva = props.onLenderChange.bind(this, 'leva');
    this.onLenderChangeToDanik = props.onLenderChange.bind(this, 'danik');
    this.onLenderChangeTo2Masters = props.onLenderChange.bind(this, '2masters');

    this.onBorrowerChangeToLeva = props.onBorrowerChange.bind(this, 'leva');
    this.onBorrowerChangeToDanik = props.onBorrowerChange.bind(this, 'danik');
    this.onBorrowerChangeTo2Masters = props.onBorrowerChange.bind(this, '2masters');
  }

  onAmountChange = event => {
    const { onAmountChange } = this.props;

    this.setState({
      isAmountDirty: true
    });

    onAmountChange(event);
  };

  onDescriptionChange = event => {
    const { onDescriptionChange } = this.props;

    this.setState({
      isDescriptionDirty: true
    });

    onDescriptionChange(event);
  };

  render() {
    const { isAmountDirty, isDescriptionDirty } = this.state;
    const { id, lender, borrower, amount, description, date, onDateChange } = this.props;

    return (
      <div>
        <div className="RecordForm-lender-and-borrower-container">
          <div className="RecordForm-lender-container">
            <div>
              <button
                className={`RecordForm-lender-button big-button${lender === 'leva' ? ' RecordForm-lender-selected': ''}`}
                type="button"
                onClick={this.onLenderChangeToLeva}>
                Leva
              </button>
            </div>
            <div>
              <button
                className={`RecordForm-lender-button big-button${lender === 'danik' ? ' RecordForm-lender-selected': ''}`}
                type="button"
                onClick={this.onLenderChangeToDanik}>
                Danik
              </button>
            </div>
            <div>
              <button
                className={`RecordForm-lender-button big-button${lender === '2masters' ? ' RecordForm-lender-selected': ''}`}
                type="button"
                onClick={this.onLenderChangeTo2Masters}>
                2 Masters
              </button>
            </div>
          </div>
          <div className="RecordForm-arrow">
            →
          </div>
          <div className="RecordForm-borrower-container">
            <div>
              <button
                className={`RecordForm-borrower-button big-button${borrower === 'leva' ? ' RecordForm-borrower-selected': ''}`}
                type="button"
                onClick={this.onBorrowerChangeToLeva}
                disabled={lender === 'leva'}>
                Leva
              </button>
            </div>
            <div>
              <button
                className={`RecordForm-borrower-button big-button${borrower === 'danik' ? ' RecordForm-borrower-selected': ''}`}
                type="button"
                onClick={this.onBorrowerChangeToDanik}
                disabled={lender === 'danik'}>
                Danik
              </button>
            </div>
            <div>
              <button
                className={`RecordForm-borrower-button big-button${borrower === '2masters' ? ' RecordForm-borrower-selected': ''}`}
                type="button"
                onClick={this.onBorrowerChangeTo2Masters}
                disabled={lender === '2masters'}>
                2 Masters
              </button>
            </div>
          </div>
        </div>
        <div className="RecordForm-text-fields-container">
          <div className="field-container">
            <label className="RecordForm-label" htmlFor={`${id}-amount`}>
              Amount:
            </label>
            <input
              id={`${id}-amount`}
              className={`RecordForm-input${!isAmountDirty || isAmountValid(amount) ? '' : ' invalid-input'}`}
              type="text"
              value={amount}
              onChange={this.onAmountChange}
              autoComplete="off"
              spellCheck="false"
            />
          </div>
          <div className="field-container">
            <label className="RecordForm-label" htmlFor={`${id}-description`}>
              Description:
            </label>
            <input
              id={`${id}-description`}
              className={`RecordForm-input${!isDescriptionDirty || isDescriptionValid(description) ? '' : ' invalid-input'}`}
              type="text"
              value={description}
              onChange={this.onDescriptionChange}
              autoComplete="off"
              spellCheck="false"
            />
          </div>
          <div className="field-container">
            <label className="RecordForm-label" htmlFor={`${id}-date`}>
              Date:
            </label>
            <input
              id={`${id}-date`}
              className={`RecordForm-input${isDateValid(date) ? '' : ' invalid-input'}`}
              type="date"
              value={date}
              onChange={onDateChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default RecordForm;
