import PropTypes from 'prop-types';
import React from 'react';
import { sendPost, sendDelete } from "./utils";

export default class AdminIndex extends React.Component {

  static contextTypes = {
    transitTo: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      users: this.props.users,
    };
    this.handleUserCreate = this.handleUserCreate.bind(this);
    this.handleUserDelete = this.handleUserDelete.bind(this);
    this.handleChangeUser = this.handleChangeUser.bind(this);
  }

  handleUserCreate() {
    const data = {
      uid : this.refs.user_uid.value,
      name : this.refs.user_name.value,
    }
    sendPost('/users', data)
    .then((data) => {
      let users = Object.assign([], this.state.users);
      users.push(data.user);
      this.setState({
        users: users,
      });
    });
  }

  handleUserDelete(e) {
    const userId = e.target.getAttribute('data-user-id');
    sendDelete(`/users/${userId}`)
    .then((data) => {
      if (data.status === 'success') {
        let users = Object.assign([], this.state.users);
        const index = users.indexOf(data.user);
        users.splice(index, 1);
        this.setState({
          users: users,
        });
      }
    });
  }

  handleChangeUser(e) {
    e.preventDefault();
    sendPost('/users/current', {
      user_id : this.refs.user_id.value,
    })
    .then((data) => {
      this.context.transitTo('/admin', { pushState: true });
    });
  }


  render() {
    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h1><i className='icon-check-sign'></i> ユーザー一覧</h1>
          </div>
          <div className="panel-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>id</th>
                  <th>uid</th>
                  <th>name</th>
                  <th>delete</th>
                </tr>
              </thead>
              <tbody>
              {(() => {
                if (this.state.users.length) {
                  return this.state.users.map((user, i) => {
                    return (
                      <tr key ={user.id}>
                        <td>{user.id}</td>
                        <td>{user.uid}</td>
                        <td>{user.name}</td>
                        <td><button className="btn btn-primary" onClick={this.handleUserDelete} data-user-id={user.id}>削除</button></td>
                      </tr>
                    );
                  });
                }
              })()}
              <tr>
                <td></td>
                <td><input type="text" className="form-control" ref='user_uid' /></td>
                <td><input type="text" className="form-control" ref='user_name' /></td>
                <td><button className="btn btn-primary" onClick={this.handleUserCreate}>追加</button></td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="panel panel-default">
          <div className="panel-heading">
            <h1><i className='icon-check-sign'></i> カレントユーザー変更</h1>
          </div>
          <div className="panel-body">
            {(() => {
              if (this.props.currentUser) {
                return <p>カレントユーザーID:{this.props.currentUser.id}</p>;
              } else {
                return <p>カレントユーザーID:ログアウト状態</p>;
              }
            })()}
            <form onSubmit={this.handleChangeUser}>
              <input className="form-control" type="text" ref='user_id' required />
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
