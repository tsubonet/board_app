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
    if (this.props.filter == 'new') {
      param = '&order=new';
    } else if (this.props.filter.indexOf('tag') !== -1) {
      param = '&tag='+ this.props.filter.replace('tag', '');
    } else {
      param = '';
    }

    return (
      <div>
        <Helmet>
          <title>Index</title>
        </Helmet>
        <div className="row">
          <div className="col-md-8">
            <Messages messages={this.state.messages} />
            <div className="panel panel-default">
              <div className="panel-heading">
                <h1><i className='icon-check-sign'></i>&nbsp;性の悩みを解決する匿名Q&amp;Aサービス</h1>
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
                    if (this.state.pager.has_prev_page) {
                      return <Link className="pagination-angle" href={`?page=${ parseInt(this.state.pager.current_page) - 1 }${param}`}><i className="icon-angle-left icon-2x"></i></Link>;
                    } else {
                      return <i className="icon-angle-left icon-2x"></i>;
                    }
                  })()}
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="pagination-position">{this.state.pager.current_page}&nbsp;/&nbsp;{this.state.pager.total_pages}</span>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {(() => {
                    if (this.state.pager.has_next_page) {
                      return <Link className="pagination-angle" href={`?page=${ parseInt(this.state.pager.current_page) + 1 }${param}`}><i className="icon-angle-right icon-2x"></i></Link>;
                    } else {
                      return <i className="icon-angle-right icon-2x"></i>;
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
