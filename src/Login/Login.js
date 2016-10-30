import React, { Component, PropTypes } from 'react';
import './Login.css';

class Login extends Component {
  static contextTypes = {
    base: PropTypes.object
  };

  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      loading: false,
      error: null
    };
  }

  componentDidMount() {
    this.emailField.focus();
  }

  storeEmailFieldReference = input => {
    if (input !== null) {
      this.emailField = input;
    }
  };

  onEmailChange = event => {
    this.setState({
      email: event.target.value
    });
  };

  onPasswordChange = event => {
    this.setState({
      password: event.target.value
    });
  };

  login = event => {
    event.preventDefault();

    this.setState({
      loading: true,
      error: null
    });

    const { base } = this.context;
    const { email, password } = this.state;

    base.authWithPassword({
      email: email.trim(),
      password: password.trim()
    }, error => {
      this.setState({
        loading: false,
        error: error === null ? null : 'Something went wrong'
      });
    });
  };

  render() {
    const { email, password, loading, error } = this.state;

    return (
      <div className="Login-container">
        <div className="Login-header">
          I
          <svg className="Login-coin-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
            <path d="M279.5.6c-33.7 3.3-56.1 8.2-82.8 17.9-81.8 29.6-148.6 96.4-178.2 178.2C5.6 232.1.6 261.4.6 300c0 25.4.7 33.6 4.9 56.5 19.1 102.3 93.2 189.5 191.2 225 35.4 12.9 64.7 17.9 103.3 17.9 25.4 0 33.6-.7 56.5-4.9 102.3-19.1 189.5-93.2 225-191.2 12.9-35.4 17.9-64.7 17.9-103.3 0-25.4-.7-33.6-4.9-56.5C579.9 165.3 533 94.9 466 50.3 426.9 24.4 386.5 9.2 338 2.4 328 1 287.9-.2 279.5.6zm40.3 104l.3 14.2 4.7.6c10.3 1.5 24.2 5.9 34.2 10.8 8.9 4.4 11.8 6.5 19.1 13.8 12.2 12.2 18.4 24.7 21.4 43.5 1.5 9 2 30 .9 34.2l-.6 2.3h-87.5l-.6-18.8c-.9-28.6-3.1-33.2-15.9-33.2-5 0-6.2.4-9.3 3.1-4.6 4.1-6.5 10.6-6.5 22.4 0 10.4 2 19.3 5.5 24.7 3.5 5.3 12.7 11.9 49.3 35.2 44.3 28.2 50.3 32.9 58.8 46.2 9.8 15.3 14.8 31.4 16.3 52.7 3.9 55.7-15.3 94-55.7 110.7-7.5 3.2-28.5 9-32.3 9-1.7 0-1.9 1.2-2.1 16.7l-.3 16.8-20.2.3-20.3.2v-34.6l-7.7-1.3c-28.7-4.7-56.5-22.7-67.5-43.6-8.7-16.7-11.8-31.7-12.5-61.3l-.5-21.2H279v19.2c.1 10.6.5 25 .9 31.9 1.4 19.5 4.5 23.6 17.1 22.7 7-.5 10.1-2.8 13.4-9.8 4.1-8.8 1.8-48.9-3.5-59.2-3.9-7.6-13.8-15.9-37.5-31.3-50.4-32.9-57.4-39.4-69.4-64.9-12.5-26.4-13.9-61.1-3.5-86.7 10.6-26.2 35.6-43.4 71.8-49.5l10.7-1.8V90l20.3.2 20.2.3.3 14.1z"/>
          </svg>
          U
        </div>
        <form onSubmit={this.login}>
          {/* https://medium.com/paul-jaworski/turning-off-autocomplete-in-chrome-ee3ff8ef0908 */}
          <input type="hidden" value="whatever" />
          <div className="field-container">
            <label className="Login-label" htmlFor="login-email">
              Email
            </label>
            <input
              id="login-email"
              className="Login-input"
              type="text"
              value={email}
              onChange={this.onEmailChange}
              autoComplete="off"
              spellCheck="false"
              ref={this.storeEmailFieldReference}
            />
          </div>
          <div className="field-container">
            <label className="Login-label" htmlFor="login-password">
              Password
            </label>
            <input
              id="login-password"
              className="Login-input"
              type="password"
              value={password}
              onChange={this.onPasswordChange}
              autoComplete="new-password" // Must be "new-password" to disable the autofill, don't ask me why.
            />
          </div>
          <div className="Login-footer">
            <button
              className="Login-button big-button"
              type="submit"
              disabled={loading}>
              {loading ? 'Loading...' : 'Login'}
            </button>
            {
              error ?
                <div className="Login-error error-message">{error}</div> :
                null
            }
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
