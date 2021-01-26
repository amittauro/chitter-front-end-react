import React, { Component } from 'react';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  handleUsername(event) {
    this.setState({username: event.target.value,})
  }

  handlePassword(event) {
    this.setState({password: event.target.value,})
  }

  handleSubmit(event) {
    event.preventDefault();
    const body = `{"user": {"handle":"${this.state.username}", "password":"${this.state.password}"}}`
    fetch("https://chitter-backend-api-v2.herokuapp.com/users", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: body
    })
    .then(response => response.json())
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" onChange={this.handleUsername} />
        </label>
        <label>
          Password:
          <input type="text" name="password" onChange={this.handlePassword} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default SignUp
