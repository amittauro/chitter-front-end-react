import React from 'react'
import PropTypes from 'prop-types'
import './css/Peep.css'

class Peep extends React.Component {
  constructor (props) {
    super(props)
    const sessionId = sessionStorage.getItem('sessionId')
    const sessionKey = sessionStorage.getItem('sessionKey')
    this.state = { error: null, sessionId: sessionId, sessionKey: sessionKey }

    this.handleLike = this.handleLike.bind(this)
  }

  handleLike () {
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    myHeaders.append('Authorization', `Token token=${this.state.sessionKey}`)
    fetch(`https://chitter-backend-api-v2.herokuapp.com/peeps/${this.props.id}/likes/${this.state.sessionId}`, {
      method: 'PUT',
      headers: myHeaders
    })
      .then(response => response.json())
      .then(
        (result) => {
          if (result.user[0] === 'has already been taken') {
            window.alert('you have already liked this peep try a different one')
          } else {
            window.alert('Thanks for liking a peep')
          }
        },
        (error) => {
          this.setState({
            error
          })
          window.alert('Unable to like peep. Are you signed in?')
        }
      )
  }

  render () {
    return (
      <div className="peep">
        <p>{this.props.body}</p>
        <button className="likePeep" onClick={this.handleLike}>like</button>
        Likes: {this.props.likes}
      </div>
    )
  }
}

Peep.propTypes = {
  id: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired
}

export default Peep
