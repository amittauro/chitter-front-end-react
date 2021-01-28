import React from 'react'
import SignUp from './SignUp'
import SignIn from './SignIn'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = { signIn: false }
    this.handleSignIn = this.handleSignIn.bind(this)
  }

  handleSignIn (event) {
    this.setState({ signIn: true })
  }

  render () {
    if (this.state.signIn === false) {
      return (
        <div>
          <SignUp />
          <button onClick={this.handleSignIn}>Sign In</button>
        </div>
      )
    } else {
      return (
        <SignIn />
      )
    }
  }
}

export default App
