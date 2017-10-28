import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from "react-helmet";
import Link from './link';
import Messages from "./messages";
import { formatDate, sendPost } from "./utils";


export default class TopicsShow extends React.Component {

  static contextTypes = {
    transitTo: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      topic: this.props.topic,
      messages: {
        status: '',
        txt: [],
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let data = {
      user: localStorage.user_id,
      topic_id: this.state.topic.id,
      content : this.refs.comment_content.value.trim(),
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

    return (
      <div>
        <Helmet>
          <title>Show</title>
        </Helmet>
        <div className="row">
          <div className="col-md-8">
            <Messages messages={this.state.messages} />
            <div className="panel panel-default">
              <div className="panel-heading">
                <ul className="list-inline marB0">
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
                  <li><div className="btn btn-default topic-delete-btn" data-topic-id="#"><i className="icon-remove-sign"></i>&nbsp;この質問を削除する</div></li>
                </ul>
              </div>
              <div className="panel-body">
                <h1 className="h1-detail"><i className="icon-comment"></i>&nbsp;{this.state.topic.title}</h1>
                <p>{this.state.topic.content}</p>
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
                              { comment.user === localStorage.user_id ? <li><a href="javascript:void(0)" className="comment-delete-btn"><i className="icon-remove-sign"></i> 削除</a></li> : ''}
                              {
                                //<p><?php echo nl2br($this->text->autoLinkUrls(h($comment['link_url']), array( 'target' => '_blank'))); ?></p>
                              }
                            </ul>
                            <p>{comment.content}</p>
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
                        <textarea className="form-control" placeholder="回答を入力して下さい" rows="5" id="comment-content" ref="comment_content"></textarea>
                      </div>
                      <div className="form-group">
                        <div className="link-input-wrap">
                          <i className='icon-pencil'></i>&nbsp;<label htmlFor="comment-link">リンク</label>
                          <input type="text" className="form-control" placeholder="http://" id="comment-link" ref="comment-link" />
                        </div>
                        <div className="comment-link-btn btn btn-default btn-sm">
                          <i className='icon-link'></i>リンク追加
                        </div>
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

          <div className="col-md-4">
          </div>
        </div>
      </div>
    );
  }
}
