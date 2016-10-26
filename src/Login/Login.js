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
        error: error === null ? null : 'Sorry mate'
      });
    });
  };

  render() {
    const { email, password, loading, error } = this.state;

    return (
      <form onSubmit={this.login}>
        {/* https://medium.com/paul-jaworski/turning-off-autocomplete-in-chrome-ee3ff8ef0908 */}
        <input type="hidden" value="whatever" />
        <div className="field-container">
          <label className="Login-label" htmlFor="login-email">
            Email:
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
            Password:
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
          {
            loading ?
              'Loading...' :
              <button className="Login-button big-button" type="submit">
                Login
              </button>
          }
          {
            error ?
              <span className="Login-sorry error-message">{error}</span> :
              null
          }
        </div>
      </form>
    );
  }
}

export default Login;
