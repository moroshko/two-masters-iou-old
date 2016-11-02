import React, { Component, PropTypes } from 'react';
import Rebase from 're-base';
import Login from './Login/Login';
import Logout from './Logout/Logout';
import Message from './Message/Message';
import Balance from './Balance/Balance';
import NewRecord from './NewRecord/NewRecord';
import Records from './Records/Records';
import { getMessage } from './helpers';
import './App.css';

const base = Rebase.createClass({
  apiKey: 'AIzaSyAvz5taK0m48RrfSQxrELm02swca9XQkus',
  authDomain: 'two-masters-iou.firebaseapp.com',
  databaseURL: 'https://two-masters-iou.firebaseio.com',
  storageBucket: 'two-masters-iou.appspot.com',
});

// const base = Rebase.createClass({
//   apiKey: 'AIzaSyBDC5ysToSJhtyRhq7WkCYBeLGAw8wOz0U',
//   authDomain: 'test-two-masters-iou.firebaseapp.com',
//   databaseURL: 'https://test-two-masters-iou.firebaseio.com',
//   storageBucket: 'test-two-masters-iou.appspot.com',
// });

const message = getMessage();

class App extends Component {
  static childContextTypes = {
    base: PropTypes.object
  };

  constructor() {
    super();

    this.state = {
      loading: true,
      user: null,
      isLogoutCollapsed: true,
      newRecordKey: null
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

  onNewRecordCreated = newRecordKey => {
    this.setState({
      newRecordKey: newRecordKey
    });

    setTimeout(() => {
      this.setState({
        newRecordKey: null
      });
    }, 3000);
  };

  render() {
    const { loading, user, isLogoutCollapsed, newRecordKey } = this.state;

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
                {message ? <Message message={message} /> : null}
                <Balance
                  isLogoutCollapsed={isLogoutCollapsed}
                  onProfileIconClick={this.toggleIsLogoutCollapsed}
                />
                <NewRecord onCreated={this.onNewRecordCreated} />
                <Records newRecordKey={newRecordKey} />
              </div> :
              <Login />
            )
        }
      </div>
    );
  }
}

export default App;
