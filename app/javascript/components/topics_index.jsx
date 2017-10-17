import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from "react-helmet";
import Link from './link';
import Topic from './topic';

export default class TopicsIndex extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      topics: this.props.topics,
      currentPage: this.props.currentPage,
      totalPages: this.props.totalPages,
      hasPrevPage: this.props.hasPrevPage,
      hasNextPage: this.props.hasNextPage,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      topics: nextProps.topics,
      currentPage: nextProps.currentPage,
      totalPages: nextProps.totalPages,
      hasPrevPage: nextProps.hasPrevPage,
      hasNextPage: nextProps.hasNextPage,
    });
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Index</title>
        </Helmet>
        <div className="row">
          <div className="col-md-8">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h1><i className='icon-check-sign'></i> 性の悩みを解決する匿名Q&amp;Aサービス</h1>
              </div>
              <div className="list-group">
              {(() => {
                if (this.state.topics) {
                  return this.state.topics.map((topic, i) => {
                    return <Topic topic={topic} key={topic.id} />;
                  });
                } else {
                  return (<p className="list-group-item">検索ワードに一致する記事はありません。</p>);
                }
              })()}
              </div>
              <hr className="marT0 marB0" />

              <div className="wrap-pagination text-center">
                <nav className="pagination">
                  {(() => {
                    if (this.state.hasPrevPage) {
                      return <Link className="pagination-angle" href={`?page=${ parseInt(this.state.currentPage) - 1 }`}><i className="icon-angle-left icon-2x"></i></Link>;
                    }
                  })()}
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="pagination-position">{this.state.currentPage}&nbsp;/&nbsp;{this.state.totalPages}</span>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {(() => {
                    if (this.state.hasNextPage) {
                      return <Link className="pagination-angle" href={`?page=${ parseInt(this.state.currentPage) + 1 }`}><i className="icon-angle-right icon-2x"></i></Link>;
                    }
                  })()}
                </nav>
              </div>
            </div>
          </div>

          <div className="col-md-4">
          </div>
        </div>

        <Link href="/topics/show">topics/show</Link>
      </div>
    );
  }
}
