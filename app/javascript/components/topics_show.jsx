import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from "react-helmet";
import Link from './link';
import Messages from "./messages";
import AddLink from "./add_link";
import { formatDate, formatPostString, sendPost, smoothScroll } from "./utils";

export default class TopicsShow extends React.Component {

  static contextTypes = {
    transitTo: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      topic: this.props.topic,
      content: '',
      commentSelectPos: '',
      messages: {
        status: '',
        txt: [],
      },
    };
    this.handleSubmit        = this.handleSubmit.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleLinkSubmit    = this.handleLinkSubmit.bind(this);
    this.scrollToCommentBox  = this.scrollToCommentBox.bind(this);
  }

  scrollToCommentBox(e) {
    smoothScroll.scrollTo('comment-form');
    this.refs.comment_textarea.focus();
    const commentId = e.target.getAttribute('data-comment-id');
    if (!commentId) return;
    const formattedCommentID = `[@${commentId}]\n`;
    this.setState((prevState, props) => {
      return { content: formattedCommentID + prevState.content };
    });
  }

  handleContentChange(e) {
    this.setState({
      content: e.target.value,
      commentSelectPos: e.target.selectionStart,
    });
  }

  handleLinkSubmit(linkString) {
    let content   = this.state.content;
    const len     = content.length;
    const pos     = this.state.selectPos;
    const before  = content.substr(0, pos);
    const after   = content.substr(pos, len);
    content = before + linkString + after;
    this.setState({
      content: content,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let data = {};
    let url  = '';
    let content = this.state.content;
    let commentId = null;
    const commentIds = content.match(/\[@(\d+)\]/g);

    if (commentIds !== null) {
      commentId = commentIds[0].replace(/\[@(\d+)\]/, "$1");
      commentIds.forEach((v) => {
        content = content.replace(v, '');
      });
    }

    if (commentId === null) {
      data = {
        user: localStorage.user_id,
        topic_id: this.state.topic.id,
        content: content.trim(),
      };
      url = '/comments';
    } else {
      data = {
        user: localStorage.user_id,
        comment_id: commentId,
        content: content.trim(),
      };
      url = '/replies';
    }

    sendPost(url, data)
    .then((data) => {
      if (data.status === 'success') {
        let topic = Object.assign({}, this.state.topic);
        if (commentId === null) {
          topic.comments.push(data.comment);
        } else {
          const comments = topic.comments.map((v) => {
            if (v.id === parseInt(commentId)){
              v.replies.push(data.reply);
            }
            return v;
          });
          topic.comments = comments;
        }
        this.setState({
          topic: topic,
          content: '',
        });
      }
      window.scrollTo(0, 0);
      this.setState({
        messages: {
          status: data.status,
          txt: data.txt,
        },
      });
    })
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
                  return (
                    <small>カテゴリー：</small>
                  );
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
            <p className="text-center marT20 marB20"><a className="btn btn-primary" onClick={this.scrollToCommentBox}>この質問に回答する</a></p>
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
                            //comment.user === this.user_id ? <li><a href="javascript:void(0)" className="comment-delete-btn"><i className="icon-remove-sign"></i> 削除</a></li> : ''
                          }
                        </ul>
                        <p className="pre-line">{comment.content}</p>
                        <div className="reply-show-btn text-right">
                          <button className="btn btn-default btn-sm" data-comment-id={comment.id} onClick={this.scrollToCommentBox}>この回答に対してコメントする</button>
                        </div>
                        <hr />
                      </div>
                    )
                  });
                } else {
                  return (
                    <p>まだコメントがありません</p>
                  );
                }
              })()}
              </div>
            </div>


            <div className="panel panel-default comment-form" id="comment-form">
              <div className="panel-heading">
                <strong><i className='icon-check-sign'></i>&nbsp;回答する</strong>
              </div>
              <div className="panel-body">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <textarea className="form-control" placeholder="回答を入力して下さい" rows="5" ref="comment_textarea" value={this.state.content} onChange={this.handleContentChange}></textarea>
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
