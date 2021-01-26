import React, { Component } from 'react'

class Peeps extends React.Component {
  constructor (props) {
    super(props)
    this.state = { peeps: [] }
  }

  componentDidMount () {
    fetch('https://chitter-backend-api-v2.herokuapp.com/peeps')
      .then(res => res.json())
      .then(data => {
        this.setState({ peeps: data })
      })
  }

  render () {
    return (
      <ul>
        {this.state.peeps.map(peep => (
          <li key={peep.id}>
            {peep.body}
          </li>
        ))}
      </ul>
    )
  }
}

export default Peeps
