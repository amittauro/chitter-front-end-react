import React, { Component } from 'react';

class PostPeep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {peep: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePeep = this.handlePeep.bind(this);
  }

  handlePeep(event) {
    this.setState({peep: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.props)
    const body = `{"peep": {"user_id":"${this.props.userId}", "body":"${this.state.peep}"}}`
    fetch("https://chitter-backend-api-v2.herokuapp.com/peeps", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token token="${this.props.sessionKey}"`
      },
      body: body
    })
    .then(response => response.json())
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Peep:
          <input type="text" name="username" onChange={this.handlePeep} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }

}

export default PostPeep
