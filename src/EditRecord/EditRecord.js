import React, { Component, PropTypes } from 'react';
import RecordForm from '../RecordForm/RecordForm';
import { isRecordValid, getLevaOwesDanikDiff } from '../helpers';
import './EditRecord.css';

class EditRecord extends Component {
  static contextTypes = {
    base: PropTypes.object
  };

  static propTypes = {
    record: PropTypes.object.isRequired,
    onUpdateSuccess: PropTypes.func.isRequired
  };

  constructor({ record }) {
    super();

    const { lender, borrower, amount, description, date } = record;

    this.state = {
      lender: lender,
      borrower: borrower,
      amount: String(amount),
      isAmountDirty: false,
      description: description,
      isDescriptionDirty: false,
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

  onIsAmountDirtyChange = value => {
    this.setState({
      isAmountDirty: value
    });
  };

  onDescriptionChange = event => {
    this.setState({
      description: event.target.value
    });
  };

  onIsDescriptionDirtyChange = value => {
    this.setState({
      isDescriptionDirty: value
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
    const { record, onUpdateSuccess } = this.props;
    const { key } = record;
    const updatedRecord = {
      lender: lender,
      borrower: borrower,
      amount: parseFloat(amount.trim()),
      description: description.trim(),
      date: date
    };
    const levaOwesDanikDiff =
      getLevaOwesDanikDiff(updatedRecord) - getLevaOwesDanikDiff(record);

    base.update(`records/${key}`, { data: updatedRecord })
      .then(() => {
        base.database().ref('/levaOwesDanik')
          .transaction(levaOwesDanik => levaOwesDanik + levaOwesDanikDiff, error => {
            if (error) {
              this.setState({
                loadingSave: false,
                error: 'Something went wrong'
              });
            } else {
              // On success, we shouldn't update `state.loadingSave`,
              // because this component will be unmounted,
              // and React would throw an error.
              onUpdateSuccess();
            }
          });
      })
      .catch(error => {
        this.setState({
          loadingSave: false,
          error: 'Something went wrong'
        });
      });
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
        base.database().ref('/levaOwesDanik')
          .transaction(levaOwesDanik => levaOwesDanik - getLevaOwesDanikDiff(recordToDelete), error => {
            if (error) {
              this.setState({
                loadingDelete: false,
                error: 'Something went wrong'
              });
            }
            // On success, we shouldn't update `state.loadingDelete`,
            // because this component will be unmounted,
            // and React would throw an error.
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

    return (
      <button
        className="small-button"
        type="submit"
        disabled={loadingSave || !isRecordValid(this.state)}>
        {loadingSave ? 'Saving...' : 'Save'}
      </button>
    );
  };

  renderDeleteButton = () => {
    const { loadingDelete, amount } = this.state;

    if (amount.trim() !== '') {
      return null;
    }

    return (
      <button
        className="EditRecord-delete-button small-button danger-button"
        type="button"
        disabled={loadingDelete}
        title="Delete record"
        onClick={this.deleteRecord}>
        {loadingDelete ? 'Deleting...' : 'Delete'}
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
    const { record } = this.props;
    const {
      lender, borrower,
      amount, isAmountDirty,
      description, isDescriptionDirty,
      date
    } = this.state;

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
          isAmountDirty={isAmountDirty}
          onIsAmountDirtyChange={this.onIsAmountDirtyChange}
          description={description}
          onDescriptionChange={this.onDescriptionChange}
          isDescriptionDirty={isDescriptionDirty}
          onIsDescriptionDirtyChange={this.onIsDescriptionDirtyChange}
          date={date}
          onDateChange={this.onDateChange}
        />
        <div className="EditRecord-footer">
          {this.renderSaveButton()}
          {this.renderError()}
          {this.renderDeleteButton()}
        </div>
      </form>
    );
  }
}

export default EditRecord;
