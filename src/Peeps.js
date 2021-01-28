import React from 'react'

class Peeps extends React.Component {
  constructor (props) {
    super(props)
    this.state = { peeps: [], isLoaded: false, postedPeep: '' }
    this.refreshPeeps = this.refreshPeeps.bind(this)
  }

  componentDidMount () {
    fetch('https://chitter-backend-api-v2.herokuapp.com/peeps')
      .then(res => res.json())
      .then(data => {
        this.setState({
          peeps: data,
          isLoaded: true,
          postedPeep: data[0].body
        })
      })
  }

  refreshPeeps () {
    fetch('https://chitter-backend-api-v2.herokuapp.com/peeps')
      .then(res => res.json())
      .then(data => {
        this.setState({
          peeps: data,
          isLoaded: true,
          postedPeep: data[0].body
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
          Peeps
          <button type="button" onClick={this.refreshPeeps}>Refresh Peeps</button>
          <ul>
            {this.state.peeps.map(peep => (
              <li key={peep.id}>
                {peep.body}
              </li>
            ))}
          </ul>
        </div>
      )
    }
  }
}

export default Peeps
