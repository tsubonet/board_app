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
      <Link className="list-group-item" href={`/topics/${this.props.topic.id}`}>
        <div className="topic-comment-count hidden-xs">
          <span className="badge">{this.props.topic.comments.length}</span><br />
          <span className="icon-comments"></span>&nbsp;回答
        </div>
        <div className="topic-detail">
          <h2 className="list-group-item-heading"><i className="icon-comment"></i>&nbsp;<strong>{this.props.topic.title}</strong></h2>
          <p className="list-group-item-text">{this.props.topic.content}</p>
          <ul className="list-group-item-text list-inline detail-element">
            <li><small><i className="icon-comments"></i>&nbsp;回答&nbsp;:&nbsp;0</small></li>
            <li><small><i className="icon-eye-open"></i>&nbsp;view&nbsp;:&nbsp;0</small></li>
            {(() => {
              if (this.props.topic.gender === 'male') {
                return (<li><small><i className="icon-male"></i>&nbsp;男性</small></li>);
              } else {
                return (<li><small><i className="icon-female"></i>&nbsp;女性</small></li>);
              }
            })()}

            <li><small><i className="icon-time"></i>&nbsp;1年以上前&nbsp;<span className='label label-default'>更新</span>
            </small></li>
          </ul>
          <div className="entry-arrow"><i className="icon-double-angle-right"></i></div>
        </div>
      </Link>
    );
  }
}
