import React, { Component, PropTypes } from 'react';
import Rebase from 're-base';
import Login from './Login/Login';
import Logout from './Logout/Logout';
import Balance from './Balance/Balance';
import RecordForm from './RecordForm/RecordForm';
import Records from './Records/Records';
import './App.css';

const base = Rebase.createClass({
  apiKey: 'AIzaSyAvz5taK0m48RrfSQxrELm02swca9XQkus',
  authDomain: 'two-masters-iou.firebaseapp.com',
  databaseURL: 'https://two-masters-iou.firebaseio.com',
  storageBucket: 'two-masters-iou.appspot.com',
});

class App extends Component {
  static childContextTypes = {
    base: PropTypes.object
  };

  constructor() {
    super();

    this.state = {
      loading: true,
      user: null,
      isLogoutCollapsed: true
    };
  }

  getChildContext() {
    return {
      base: base
    };
  }

  componentDidMount() {
    base.onAuth(this.onAuth);
  }

  toggleIsLogoutCollapsed = () => {
    const { isLogoutCollapsed } = this.state;

    this.setState({
      isLogoutCollapsed: !isLogoutCollapsed
    });
  };

  onAuth = user => {
    this.setState({
      loading: false,
      user: user
    });
  };

  render() {
    const { loading, user, isLogoutCollapsed } = this.state;

    return (
      <div className="App-container">
        {
          loading ?
            <div className="App-loading">Loading...</div> :
            (user ?
              <div>
                <Logout
                  isCollapsed={isLogoutCollapsed}
                  email={user.email}
                />
                <Balance
                  isLogoutCollapsed={isLogoutCollapsed}
                  onGearClick={this.toggleIsLogoutCollapsed}
                />
                <RecordForm />
                <Records />
              </div> :
              <Login />
            )
        }
      </div>
    );
  }
}

export default App;
