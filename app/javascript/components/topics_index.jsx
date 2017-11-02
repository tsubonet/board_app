import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from "react-helmet";
import Link from './link';
import Topic from './topic';
import Messages from "./messages";

export default class TopicsIndex extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      topics: this.props.topics,
      pager: this.props.pager,
      messages: {
        status: '',
        txt: [],
      },
    };
  }

  componentDidMount() {
    if (history.state !== null && typeof history.state.messages !== 'undefined') {
      this.setState({
        messages: {
          status: history.state.messages.status,
          txt: history.state.messages.txt,
        }
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      topics: nextProps.topics,
      pager: nextProps.pager,
      messages: {
        status: '',
        txt: [],
      },
    });
  }

  render() {
    let param;
    let heading;
    if (this.props.filter == 'search') {
      param = '&query='+ this.props.query;
      heading = '検索ワード「' + this.props.query + '」の投稿一覧 ';

    } else if (this.props.filter == 'tag') {
      const tag = this.props.tags.find((tag) => {
        return tag.id === parseInt(this.props.query);
      });
      param = '&tag='+ this.props.query;
      heading = 'カテゴリー「' + tag.name + '」の投稿一覧 ' + tag.topic_tags_count + '件';

    } else if (this.props.filter == 'new') {
      param = '&order=new';
      heading = '回答募集中の投稿一覧 ' + this.props.noCommentsCount + '件';

    } else {
      param = '';
      heading = '投稿一覧';
    }

    return (
      <div>
        <Helmet>
          <title>Index</title>
        </Helmet>
        <Messages messages={this.state.messages} />
        <div className="panel panel-default">
          <div className="panel-heading">
            <h1><i className='icon-check-sign'></i>&nbsp;{heading}</h1>
          </div>
          <div className="list-group">
          {(() => {
            if (this.state.topics.length) {
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
                if (this.state.pager.hasPrevPage) {
                  return <Link className="pagination-angle" href={`?page=${ parseInt(this.state.pager.currentPage) - 1 }${param}`}><i className="icon-angle-left icon-2x"></i></Link>;
                } else {
                  return <i className="icon-angle-left icon-2x"></i>;
                }
              })()}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span className="pagination-position">{this.state.pager.currentPage}&nbsp;/&nbsp;{this.state.pager.totalPages}</span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {(() => {
                if (this.state.pager.hasNextPage) {
                  return <Link className="pagination-angle" href={`?page=${ parseInt(this.state.pager.currentPage) + 1 }${param}`}><i className="icon-angle-right icon-2x"></i></Link>;
                } else {
                  return <i className="icon-angle-right icon-2x"></i>;
                }
              })()}
            </nav>
          </div>
        </div>
      </div>
    );
  }
}
