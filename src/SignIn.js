import React, { Component } from 'react';

class SignIn extends React.Component {
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

export default SignIn
