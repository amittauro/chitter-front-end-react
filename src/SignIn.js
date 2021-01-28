import React from 'react'
import PostPeep from './PostPeep'

class SignIn extends React.Component {
  constructor (props) {
    super(props)
    this.state = { username: '', password: '', isLoaded: false, userId: '', sessionKey: '' }
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
    const body = `{"session": {"handle":"${this.state.username}", "password":"${this.state.password}"}}`
    fetch('https://chitter-backend-api-v2.herokuapp.com/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          userId: data.user_id.toString(),
          sessionKey: data.session_key,
          isLoaded: true
         })
      })
  }

  render () {
    if (this.state.isLoaded === false) {
      return (
        <form onSubmit={this.handleSubmit}>
          Sign In
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
      )
    } else {
      return (
        <PostPeep userId={this.state.userId} sessionKey={this.state.sessionKey} />
      )
    }
  }
}

export default SignIn
