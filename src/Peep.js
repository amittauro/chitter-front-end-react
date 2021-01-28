import React from 'react'
import PropTypes from 'prop-types'

function Peep (props) {
  const { id, sessionId, sessionKey, body } = props
  const handleLike = () => {
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    myHeaders.append('Authorization', `Token token=${sessionKey}`)
    fetch(`https://chitter-backend-api-v2.herokuapp.com/peeps/${id}/likes/${sessionId}`, {
      method: 'PUT',
      headers: myHeaders
    })
      .then((response) => {
        response.json()
      })
  }

  return (
    <div>
      {body}
      <button onClick={handleLike}>like</button>
    </div>
  )
}

Peep.propTypes = {
  id: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  sessionId: PropTypes.string.isRequired,
  sessionKey: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired
}

export default Peep
