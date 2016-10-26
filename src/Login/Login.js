import React, { Component, PropTypes } from 'react';
import './Login.css';

class Login extends Component {
  static contextTypes = {
    base: PropTypes.object
  };

  constructor() {
    super();

    this.state = {
      loading: false,
      email: '',
      password: '',
      error: null
    };
  }

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
    const { loading, email, password, error } = this.state;

    return (
      <form onSubmit={this.login}>
        {/* https://medium.com/paul-jaworski/turning-off-autocomplete-in-chrome-ee3ff8ef0908 */}
        <input type="hidden" value="whatever" />
        <div className="Login-email-container">
          <label className="Login-label" htmlFor="email">
            Email:
          </label>
          <input
            id="email"
            className="Login-input"
            type="text"
            value={email}
            onChange={this.onEmailChange}
            autoComplete="off"
            spellCheck="false"
          />
        </div>
        <div className="Login-password-container">
          <label className="Login-label" htmlFor="password">
            Password:
          </label>
          <input
            id="password"
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
              <button className="Login-button" type="submit">Login</button>
          }
          {
            error ?
              <span className="Login-sorry">{error}</span> :
              null
          }
        </div>
      </form>
    );
  }
}

export default Login;
