import PropTypes from 'prop-types';
import React from 'react';
import { sendPost, sendDelete } from "./utils";

export default class LikeButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      model: this.props.model,
    };
    this.handleLikeCreate  = this.handleLikeCreate.bind(this);
    this.handleLikeDestroy = this.handleLikeDestroy.bind(this);
  }

  handleLikeCreate() {
    const data = {
      user_id: this.props.currentUser.id,
      post_id: this.props.model.id,
      status: this.props.status,
    };
    sendPost(`/likes`, data)
    .then((data) => {
      let model = Object.assign({}, this.state.model);
      model.likes.push(data.like);
      this.setState({
        model: model,
      });
    });
  }

  handleLikeDestroy(e) {
    const likeId = e.currentTarget.getAttribute('data-like-id');
    sendDelete(`/likes/${likeId}`)
    .then((data) => {
      let model = Object.assign({}, this.state.model);
      const index = model.likes.indexOf(data.like);
      model.likes.splice(index, 1);
      this.setState({
        model: model,
      });
    });
  }

  render() {
    return (
      <p>
        {(() => {
          if (this.props.currentUser === null) {
            return <a className="btn btn-default" href="/auth/twitter"><i className="icon-thumbs-up-alt"></i> {this.props.model.likes.length}</a>;
          } else {
            const existLike = this.props.model.likes.find((like) => {
              return like.user_id === this.props.currentUser.id;
            });
            if (existLike) {
              return <button className="btn btn-info" onClick={this.handleLikeDestroy} data-like-id={existLike.id}><i className="icon-thumbs-up"></i> {this.props.model.likes.length}</button>;
            } else {
              return <button className="btn btn-default" onClick={this.handleLikeCreate}><i className="icon-thumbs-up-alt"></i> {this.props.model.likes.length}</button>;
            }
          }
        })()}
      </p>
    );
  }
}
