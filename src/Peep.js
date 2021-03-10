import React from 'react'
import PropTypes from 'prop-types'
import './css/Peep.css'

class Peep extends React.Component {
  constructor (props) {
    super(props)
    this.state = { error: null }
    this.handleLike = this.handleLike.bind(this)
  }

  handleLike () {
    const sessionId = sessionStorage.getItem('sessionId')
    const sessionKey = sessionStorage.getItem('sessionKey')
    fetch(`https://chitter-backend-api-v2.herokuapp.com/peeps/${this.props.id}/likes/${sessionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token token=${sessionKey}`
      }
    })
      .then(response => response.json())
      .then(
        (result) => {
          if (result.user[0] === 'has already been taken') {
            window.alert('you have already liked this peep try a different one')
          } else {
            window.alert('Thanks for liking a peep. Refresh page to view likes')
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
        <p className='peep-body'>{this.props.body}</p>
        <div className='container'>
        <button onClick={this.handleLike}>like</button>
        Likes: {this.props.likes}
        </div>
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
