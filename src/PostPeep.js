import React from 'react'
import './css/forms.css'

class PostPeep extends React.Component {
  constructor (props) {
    super(props)
    this.state = { peep: '', error: null, postedPeep: '' }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handlePeep = this.handlePeep.bind(this)
  }

  handlePeep (event) {
    this.setState({ peep: event.target.value })
  }

  handleSubmit (event) {
    event.preventDefault()
    const sessionId = sessionStorage.getItem('sessionId')
    const sessionKey = sessionStorage.getItem('sessionKey')
    const body = { peep: { user_id: sessionId, body: this.state.peep } }
    fetch('https://chitter-backend-api-v2.herokuapp.com/peeps', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token token=${sessionKey}`
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(
        (result) => {
          this.setState({ postedPeep: `Thanks for posting: ${result.body}. Click Peeps to check it out!` })
        },
        (error) => {
          this.setState({
            error
          })
        }
      )
  }

  render () {
    const { error, postedPeep } = this.state
    if (error) {
      return <div>Unable to post peep. Have you signed in?</div>
    } else {
      return (
          <div>
            <form onSubmit={this.handleSubmit}>
              <h1>Post Peep</h1>
              <div>{postedPeep}</div>
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
