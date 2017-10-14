import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from "react-helmet";
import Link from './link';
import Topic from './topic';

export default class TopicsIndex extends React.Component {

  constructor(props) {
    super(props);
    this.state = { topics: this.props.topics };
  }

  // updateName = (name) => {
  //   this.setState({ name });
  // };

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
                <ul className="pagination">
                </ul>
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
