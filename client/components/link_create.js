import React, { Component } from 'react';

class LinkCreate extends Component {
  constructor(props) {
    super(props);

    this.state = { error: '' };
  }

  handleSubmit(event) {
    event.preventDefault();

    // below the input tag is set to ref="link"
    // console.log(this.refs.link.value);

    // Call the Meteor method 'links.insert', which is theory will be executed on both the client and server side
    Meteor.call('links.insert', this.refs.link.value, error => {
      // this links.insert error callback runs when url validation fails in the Meteor.methods definition on the server
      // console.log(error);

      if (error) {
        this.setState({ error: 'Enter a valid URL' });
      } else {
        this.setState({ error: '' });
        this.refs.link.value = '';
      }
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group">
          <label>Link to shorten</label>
          <input ref="link" className="form-control" />
        </div>
        <div className="text-danger">{this.state.error}</div>
        <button className="btn btn-primary">Shorten!</button>
      </form>
    );
  }
}

export default LinkCreate;
