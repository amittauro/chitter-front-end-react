import React from 'react'

function Peep(props) {
  const { id, userId, sessionId, sessionKey, body } = props;
  const handleLike = () => {
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    myHeaders.append('Authorization', `Token token=${sessionKey}`)
    fetch(`https://chitter-backend-api-v2.herokuapp.com/peeps/${id}/likes/${sessionId}`, {
      method: 'PUT',
      headers: myHeaders
    })
    .then(response => response.json())
  }


  return (
    <div>
      {body}
      <button onClick={handleLike}>like</button>
    </div>
  )
}

export default Peep
