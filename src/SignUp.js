import React, { Component } from 'react';

class SignUp extends React.Component {
  render() {
    return (
      <form>
        <label>
          Username:
          <input type="text" name="username" />
        </label>
        <label>
          Password:
          <input type="text" name="password" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default SignUp
