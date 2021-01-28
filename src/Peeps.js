import React from 'react'
import Peep from './Peep'
import PostPeep from './PostPeep'
import PropTypes from 'prop-types'

class Peeps extends React.Component {
  constructor (props) {
    super(props)
    this.state = { peeps: [], isLoaded: false }
    this.refreshPeeps = this.refreshPeeps.bind(this)
  }

  componentDidMount () {
    fetch('https://chitter-backend-api-v2.herokuapp.com/peeps')
      .then(res => res.json())
      .then(data => {
        this.setState({
          peeps: data,
          isLoaded: true
        })
      })
  }

  refreshPeeps () {
    fetch('https://chitter-backend-api-v2.herokuapp.com/peeps')
      .then(res => res.json())
      .then(data => {
        this.setState({
          peeps: data,
          isLoaded: true
        })
      })
  }

  render () {
    if (this.state.isLoaded === false) {
      return (
        <div>Loading Peeps...</div>
      )
    } else {
      return (
        <div>
          <PostPeep sessionId={this.props.sessionId} sessionKey={this.props.sessionKey} />
          <h1>Peeps</h1>
          <button type="button" onClick={this.refreshPeeps}>Refresh Peeps</button>
          <ul>
            {this.state.peeps.map(peep => (
              <li key={peep.id}>
                <Peep id={peep.id.toString()} userId={peep.user.id.toString()} sessionId={this.props.sessionId} sessionKey={this.props.sessionKey} body={peep.body} />
              </li>
            ))}
          </ul>
        </div>
      )
    }
  }
}

Peeps.propTypes = {
  sessionId: PropTypes.string.isRequired,
  sessionKey: PropTypes.string.isRequired
}

export default Peeps
