import React from 'react'
import './css/forms.css'

class PostPeep extends React.Component {
  constructor (props) {
    super(props)
    const sessionId = sessionStorage.getItem('sessionId')
    const sessionKey = sessionStorage.getItem('sessionKey')
    this.state = { peep: '', sessionId: sessionId, sessionKey: sessionKey, error: null }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handlePeep = this.handlePeep.bind(this)
  }

  handlePeep (event) {
    this.setState({ peep: event.target.value })
  }

  handleSubmit (event) {
    event.preventDefault()
    const body = { peep: { user_id: this.state.sessionId, body: this.state.peep } }
    fetch('https://chitter-backend-api-v2.herokuapp.com/peeps', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token token="${this.state.sessionKey}"`
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(
        (result) => {
          window.alert(`thanks for posting ${result.body}, view peeps to check it out!`)
        },
        (error) => {
          this.setState({
            error
          })
        }
      )
  }

  render () {
    const { error } = this.state
    if (error) {
      return <div>Unable to post peep. Have you signed in?</div>
    } else {
      return (
          <div>
            <form onSubmit={this.handleSubmit}>
              <h1>Post Peep</h1>
              <label>
                Peep:
                <input type="text" name="username" onChange={this.handlePeep} />
              </label><br></br>
              <input type="submit" value="Submit" />
            </form>
          </div>
      )
    }
  }
}

export default PostPeep
