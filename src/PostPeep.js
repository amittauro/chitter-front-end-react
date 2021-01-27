import React, { Component } from 'react';

class PostPeep extends React.Component {

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
