import React, { Component } from 'react';
import ReviewContainer from './ReviewContainer';

import '../styles/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      fellow_id: null,
      loggedIn: false,
    }
    this.attemptLogin = this.attemptLogin.bind(this);
    this.attemptSignup = this.attemptSignup.bind(this);
  }

  attemptSignup() {
    // Make POST request to /signup in server.js
    fetch('/signup', {
      method: 'POST',
      body: `{username: ${this.state.username}, password: ${this.state.password}}`,
    })
      .then((res) => res.json())
      .then((data) => console.log('post signup success: ', data))
      .catch((e) => {
        throw e;
      });
  }

  attemptLogin() {
    // Make POST request to /login in server.js
    fetch('/user/login', {
      method: 'POST',
      body: JSON.stringify({ username: this.state.username, password: this.state.password }),
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        // Get data from response object
        const { username, fellow_id, loggedIn } = data;
        if (loggedIn) {
          // re-render App component to reflect logged in state
          console.log('logged in!')
          this.setState({ loggedIn, fellow_id });
        }
      })
      .catch((e) => {
        throw e;
      });
  }

  render() {
    if (!this.state.loggedIn) {
      return (
        <div>
          Username:
          <input onChange={(e) => this.setState({ username: e.target.value })} type='text' /> <br />
          Password:
          <input onChange={(e) => this.setState({ password: e.target.value })} type='text' /><br />
          {/*buttons for triggering requests*/}
          <button onClick={() => this.attemptLogin()}>Login</button>
          <button onClick={() => this.attemptSignup()}>Sign Up</button>
        </div>
      );
    } else {
      return (
        <ReviewContainer id={this.state.fellow_id} user={this.state.username} />
      );
    }
  }
}

export default App;