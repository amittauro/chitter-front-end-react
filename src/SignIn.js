import React from 'react'
import './css/forms.css'

class SignIn extends React.Component {
  constructor (props) {
    super(props)
    this.state = { username: '', password: '', isLoaded: false, error: null, signedIn: false }
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
    const body = { session: { handle: this.state.username, password: this.state.password } }
    fetch('https://chitter-backend-api-v2.herokuapp.com/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(
        (data) => {
          this.setState({
            isLoaded: true,
            signedIn: true
          })
          sessionStorage.setItem('sessionId', data.user_id.toString())
          sessionStorage.setItem('sessionKey', data.session_key)
        },
        (error) => {
          window.alert('It looks like these details are not valid. Try again or try signing up')
          this.setState({
            isLoaded: true,
            error
          })
        }
      )
  }

  render () {
    const { error, isLoaded, signedIn } = this.state
    if (!isLoaded || error) {
      return (
          <form onSubmit={this.handleSubmit}>
            <h1>Sign In</h1>
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
    } else if (signedIn) {
      return (<div>Thanks for signing in. You can now post or like a peep</div>)
    }
  }
}

export default SignIn
