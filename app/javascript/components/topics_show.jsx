import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from "react-helmet";
import Link from './link';
import Messages from "./messages";
import AddLink from "./add_link";
import { formatDate, formatPostString, sendPost } from "./utils";

export default class TopicsShow extends React.Component {

  static contextTypes = {
    transitTo: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      topic: this.props.topic,
      commentContent: '',
      commentSelectPos: '',
      messages: {
        status: '',
        txt: [],
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCommentContentChange = this.handleCommentContentChange.bind(this);
    this.handleLinkSubmit = this.handleLinkSubmit.bind(this);
  }

  componentWillMount() {
    this.user_id = typeof localStorage !== 'undefined' ? localStorage.user_id: '';
  }

  handleCommentContentChange(e) {
    this.setState({
      commentContent: e.target.value,
      commentSelectPos: e.target.selectionStart,
    });
  }

  handleLinkSubmit(linkString) {
    let content   = this.state.commentContent;
    const len     = content.length;
    const pos     = this.state.selectPos;
    const before  = content.substr(0, pos);
    const after   = content.substr(pos, len);
    content = before + linkString + after;
    this.setState({
      commentContent: content
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let data = {
      user: localStorage.user_id,
      topic_id: this.state.topic.id,
      content : this.state.commentContent,
    }
    sendPost('/comments', data)
    .then((data) => {
      window.scrollTo(0, 0);
      if (data.status === 'success') {
        let topic = Object.assign({}, this.state.topic);
        topic.comments.push(data.comment);
        this.setState({
          topic: topic,
          messages: {
            status: 'success',
            txt: data.txt,
          }
        });
      } else {
        this.setState({
          messages: {
            status: 'error',
            txt: data.txt,
          }
        });
      }
    })
    .catch((response) => {
    });
  }


  render() {
    const updated_at = formatDate(new Date(this.state.topic.updated_at), 'YYYY-MM-DD hh:mm');
    const formatted_content = formatPostString(this.state.topic.content);
    return (
      <div>
        <Helmet>
          <title>Show</title>
        </Helmet>
        <Messages messages={this.state.messages} />
        <div className="panel panel-default">
          <div className="panel-heading">
            <ul className="list-inline clearfix marB0">
              <li><strong><i className="icon-user"></i>&nbsp;{this.state.topic.user}さんの質問</strong></li>
              {(() => {
                if (this.state.topic.gender === 'male') {
                  return (<li className="glay"><strong><i className="icon-male"></i>&nbsp;男性</strong></li>);
                } else {
                  return (<li className="glay"><strong><i className="icon-female"></i>&nbsp;女性</strong></li>);
                }
              })()}
              <li className="glay"><strong><i className="icon-time"></i>&nbsp;{updated_at}</strong></li>
              <li className="glay"><strong className="text-right"><i className="icon-eye-open"></i>&nbsp;view&nbsp;:&nbsp;{this.state.topic.view_count}</strong></li>
              <li className="right"><div className="btn btn-default topic-delete-btn" data-topic-id="#"><i className="icon-remove-sign"></i>&nbsp;この質問を削除する</div></li>
            </ul>
          </div>
          <div className="panel-body">
            <h1 className="h1-detail"><i className="icon-comment"></i>&nbsp;{this.state.topic.title}</h1>
            <p className="pre-line" dangerouslySetInnerHTML={{ __html: formatted_content }}></p>
            <p className="glay">
              {(() => {
                if (this.state.topic.tags.length) {
                  return (<small>カテゴリー：</small>);
                }
              })()}
              {(() => {
                if (this.state.topic.tags.length) {
                  return this.state.topic.tags.map((tag, i) => {
                    return <Link href={`/?tag=${tag.id}`} key={tag.id} className="marR5"><small className="btn btn-default btn-xs">{tag.name}</small></Link>;
                  });
                }
              })()}
            </p>
            <p className="text-center marT20 marB20"><a className="btn btn-primary" href="#comment-form">この質問に回答する</a></p>
            <div className="panel panel-default">
              <div className="panel-heading">
                <strong><i className='icon-check-sign'></i>&nbsp;みんなの回答&nbsp;<span id="comment-count">{this.state.topic.comments.length}</span>件</strong>
              </div>
              <div className="panel-body" id="comment-area">
              {(() => {
                if (this.state.topic.comments.length) {
                  return this.state.topic.comments.map((comment, i) => {
                    const created_at = formatDate(new Date(comment.created_at), 'YYYY-MM-DD hh:mm');
                    return (
                      <div key={comment.id}>
                        <ul className="list-inline glay">
                          <li><i className="icon-user"></i> { comment.user === this.state.topic.user? 'トピ主': comment.user }さんからの回答</li>
                          <li><i className="icon-time"></i> { created_at }</li>
                          {
                            comment.user === this.user_id ? <li><a href="javascript:void(0)" className="comment-delete-btn"><i className="icon-remove-sign"></i> 削除</a></li> : ''
                          }
                        </ul>
                        <p className="pre-line">{comment.content}</p>
                        <div className="reply-show-btn text-right">
                          <a href="javascript:void(0);" className="btn btn-default btn-sm">この回答に対してコメントする</a>
                        </div>
                        <hr />
                      </div>
                    )
                  });
                } else {
                  return (<p>まだコメントがありません</p>);
                }
              })()}
              </div>
            </div>


            <div className="panel panel-default comment-form" id="comment-content">
              <div className="panel-heading">
                <strong><i className='icon-check-sign'></i>&nbsp;回答する</strong>
              </div>
              <div className="panel-body">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <textarea className="form-control" placeholder="回答を入力して下さい" rows="5" id="comment-content" value={this.state.commentContent} onChange={this.handleCommentContentChange}></textarea>
                    <AddLink
                      content={this.state.content}
                      selectPos={this.state.selectPos}
                      onLinkSubmit={this.handleLinkSubmit}
                    />
                  </div>
                  <div className="form-group text-center">
                    <input className="btn btn-primary comment-btn" type="submit" value="この質問に回答する" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
