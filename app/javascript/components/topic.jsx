import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from "react-helmet";
import Link from './link';

export default class Topic extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Link className="list-group-item" href="xx">
        <div className="topic-comment-count hidden-xs">
          <span className="badge">0</span><br />
          <span className="icon-comments"></span> 回答
        </div>
        <div className="topic-detail">
          <h2 className="list-group-item-heading"><i className="icon-comment"></i> <strong>{this.props.topic.title}</strong></h2>
          <p className="list-group-item-text">{this.props.topic.content}</p>
          <ul className="list-group-item-text list-inline detail-element">
            <li><small><i className="icon-comments"></i> 回答 : 0</small></li>
            <li><small><i className="icon-eye-open"></i> view : 0</small></li>
            <li><small><i className="icon-male"></i></small></li>
            <li><small><i className="icon-time"></i>
                1年以上前
                 <span className='label label-default'>更新</span>
            </small></li>
          </ul>
          <div className="entry-arrow"><i className="icon-double-angle-right"></i></div>
        </div>
      </Link>
    );
  }
}
