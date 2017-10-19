import React from 'react';

export default class Messages extends React.Component {

  constructor(props) {
    super(props);
  }

  success() {
    let messages = this.props.messages.txt.map((message, index) => {
      return (<p key={index}>{message}</p>);
    });
    return (
      <div className="alert alert-success" role="alert">{messages}</div>
    );
  }

  error() {
    let messages = this.props.messages.txt.map((message, index) => {
      return (<p key={index}>{message}</p>);
    });
    return (
      <div className="alert alert-danger" role="alert">{messages}</div>
    );
  }

  render() {
    if (this.props.messages.status === 'success') {
      return this.success();
    } else if (this.props.messages.status === 'error') {
      return this.error();
    } else {
      return null;
    }
  }
}
