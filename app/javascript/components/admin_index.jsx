import PropTypes from 'prop-types';
import React from 'react';
import { sendPost, sendDelete } from "./utils";

export default class AdminIndex extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: this.props.users,
    };
    this.handleUserDelete = this.handleUserDelete.bind(this);
  }

  handleUserDelete() {

  }

  render() {
    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h1><i className='icon-check-sign'></i>ユーザー一覧</h1>
          </div>
          <div className="panel-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
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
                        <td><button className="btn btn-primary" onClick={this.handleUserDelete}>削除</button></td>
                      </tr>
                    );
                  });
                } else {
                  return (<p className="list-group-item">検索ワードに一致する記事はありません。</p>);
                }
              })()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
