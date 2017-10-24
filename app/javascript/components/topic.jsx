import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from "react-helmet";
import Link from './link';

export default class Topic extends React.Component {

  constructor(props) {
    super(props);
  }

  get_time() {
    const target_time   = new Date(this.props.topic.updated_at);
    const current_time  = new Date();
    const mseconds_diff = current_time - target_time;
    const days_diff     = Math.floor(mseconds_diff / (60 * 60 * 24 * 1000));
    const hours_diff    = Math.floor(mseconds_diff / (60 * 60 * 1000));
    const minutes_diff  = Math.floor(mseconds_diff / (60 * 1000));
    const seconds_diff  = Math.floor(mseconds_diff / (1000));
    if (days_diff > 365) {
      return "1年以上前";
    } else if (days_diff > 0) {
      return days_diff + "日前";
    } else if (hours_diff > 0) {
      return hours_diff + "時間前";
    } else if (minutes_diff > 0) {
      return minutes_diff + "分前";
    } else {
      return seconds_diff + "秒前";
    }
  }

  render() {
    const time_diff = this.get_time();
    const modified_label = (new Date(this.props.topic.updated_at) > new Date(this.props.topic.created_at))? '更新': '登録';

    return (
      <Link className="list-group-item" href={`/topics/${this.props.topic.id}`}>
        <div className="topic-comment-count hidden-xs">
          <span className="badge">{this.props.topic.comments.length}</span><br />
          <span className="icon-comments"></span>&nbsp;回答
        </div>
        <div className="topic-detail">
          <h2 className="list-group-item-heading"><i className="icon-comment"></i>&nbsp;<strong>{this.props.topic.title}</strong></h2>
          <p className="list-group-item-text">{this.props.topic.content}</p>
          <ul className="list-group-item-text list-inline detail-element">
            <li><small><i className="icon-comments"></i>&nbsp;回答&nbsp;:&nbsp;{this.props.topic.comments.length}</small></li>
            <li><small><i className="icon-eye-open"></i>&nbsp;view&nbsp;:&nbsp;0</small></li>
            {(() => {
              if (this.props.topic.gender === 'male') {
                return (<li><small><i className="icon-male"></i>&nbsp;男性</small></li>);
              } else {
                return (<li><small><i className="icon-female"></i>&nbsp;女性</small></li>);
              }
            })()}
            <li><small><i className="icon-time"></i>&nbsp;{time_diff}</small></li>
          </ul>
          <div className="entry-arrow"><i className="icon-double-angle-right"></i></div>
        </div>
      </Link>
    );
  }
}
