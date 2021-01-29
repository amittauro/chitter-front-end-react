import React from 'react'
import Peep from './Peep'
import './css/Peeps.css'

class Peeps extends React.Component {
  constructor (props) {
    super(props)
    this.state = { peeps: [], isLoaded: false }
  }

  componentDidMount () {
    fetch('https://chitter-backend-api-v2.herokuapp.com/peeps')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            peeps: result
          })
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          })
        }
      )
  }

  render () {
    const { error, isLoaded, peeps } = this.state
    if (!isLoaded) {
      return (
        <div>Loading Peeps...</div>
      )
    } else if (error) {
      return <div>Unable to loade peeps</div>
    } else {
      return (
        <div>
          <h1 className="Peeps">Peeps</h1>
          <ul>
            {peeps.map(peep => (
            <div key={peep.id}>
              <Peep id={peep.id.toString()} userId={peep.user.id.toString()} body={peep.body} />
            </div>
            ))}
          </ul>
        </div>
      )
    }
  }
}

export default Peeps
