import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from "react-helmet";
import Link from './link';


export default class TopicsShow extends React.Component {

  constructor(props) {
    super(props);
    console.log(props);
  }


  render() {
    return (
      <div>
        <Helmet>
          <title>Show</title>
        </Helmet>
        <div className="row">
          <div className="col-md-8">
            <div className="panel panel-default">
              <div className="panel-heading">
                <ul className="list-inline marB0">
                  <li><strong><i className="icon-user"></i>&nbsp;○○さんの質問</strong></li>
                  {(() => {
                    if (this.props.topic.gender === 'male') {
                      return (<li className="glay"><strong><i className="icon-male"></i>&nbsp;男性</strong></li>);
                    } else {
                      return (<li className="glay"><strong><i className="icon-female"></i>&nbsp;女性</strong></li>);
                    }
                  })()}
                  <li className="glay"><strong><i className="icon-time"></i>&nbsp;{this.props.topic.created_at}</strong></li>
                  <li className="glay"><strong className="text-right"><i className="icon-eye-open"></i>&nbsp;view&nbsp;:&nbsp;0</strong></li>
                  <li><div className="btn btn-default topic-delete-btn" data-topic-id="#"><i className="icon-remove-sign"></i>&nbsp;この質問を削除する</div></li>
                </ul>
              </div>
              <div className="panel-body">
                <h1 className="h1-detail"><i className="icon-comment"></i>&nbsp;{this.props.topic.title}</h1>
                <p>{this.props.topic.content}</p>
                <p className="glay">
                  {(() => {
                    if (this.props.topic.tags.length) {
                      return (<small>カテゴリー：</small>);
                    }
                  })()}
                  {(() => {
                    if (this.props.topic.tags.length) {
                      return this.props.topic.tags.map((tag, i) => {
                        return <Link href={`/?tag=${tag.id}`} key={tag.id}><small className="btn btn-default btn-xs">{tag.name}</small></Link>;
                      });
                    }
                  })()}
                </p>
                <p className="text-center marT20 marB20"><a className="btn btn-primary" href="#comment-form">この質問に回答する</a></p>
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <strong><i className='icon-check-sign'></i>&nbsp;みんなの回答&nbsp;<span id="comment-count">0</span>件</strong>
                  </div>
                  <div className="panel-body" id="comment-area">
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
          </div>
        </div>
      </div>
    );
  }
}
