import React, { Component, PropTypes } from 'react';
import Rebase from 're-base';
import Login from './Login/Login';
import Logout from './Logout/Logout';
import Balance from './Balance/Balance';
import NewRecord from './NewRecord/NewRecord';
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
      user: null
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

  onAuth = user => {
    this.setState({
      loading: false,
      user: user
    });
  };

  render() {
    const { loading, user } = this.state;

    return (
      <div className="App-container">
        {
          loading ?
            <div className="App-loading">Loading...</div> :
            (user ?
              <div>
                <Logout email={user.email} />
                <Balance />
                <NewRecord />
              </div> :
              <Login />
            )
        }
      </div>
    );
  }
}

export default App;
