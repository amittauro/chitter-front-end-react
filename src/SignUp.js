import React from 'react'
import './css/forms.css'

class SignUp extends React.Component {
  constructor (props) {
    super(props)
    this.state = { username: '', password: '', isLoaded: false, error: null, signedUp: false, errorMessage: '' }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUsername = this.handleUsername.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
  }

  handleUsername (event) {
    this.setState({ username: event.target.value })
  }

  handlePassword (event) {
    this.setState({ password: event.target.value })
  }

  handleSubmit (event) {
    event.preventDefault()
    const body = { user: { handle: this.state.username, password: this.state.password } }
    fetch('https://chitter-backend-api-v2.herokuapp.com/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(
        (data) => {
          this.setState({
            isLoaded: true,
            signedUp: true
          })
        },
        (error) => {
          this.setState({
            isLoaded: true,
            errorMessage: 'User already exists. Try signing in or creating a new account',
            error
          })
        }
      )
  }

  render () {
    const { error, isLoaded, signedUp, errorMessage } = this.state
    if (!isLoaded || error) {
      return (
        <form onSubmit={this.handleSubmit}>
          <div>{errorMessage}</div>
          <h1>Sign Up</h1>
          <label>
            Username:
            <input type="text" name="username" onChange={this.handleUsername} />
          </label><br></br>
          <label>
            Password:
            <input type="text" name="password" onChange={this.handlePassword} />
          </label><br></br>
          <input type="submit" value="Submit" />
        </form>
      )
    } else if (signedUp) {
      return <div>Thanks for signing up. You can now sign in.</div>
    }
  }
}

export default SignUp
