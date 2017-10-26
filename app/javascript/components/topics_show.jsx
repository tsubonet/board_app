import PropTypes from 'prop-types';
import React from 'react';
import axios from 'axios';
import { Helmet } from "react-helmet";
import Link from './link';
import Messages from "./messages";


export default class TopicsShow extends React.Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      messages: {
        status: '',
        txt: [],
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  formatDate(date, format = 'YYYY-MM-DD hh:mm:ss.SSS') {
    format = format.replace(/YYYY/g, date.getFullYear());
    format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
    format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
    format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2));
    format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
    format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
    if (format.match(/S/g)) {
      const milliSeconds = ('00' + date.getMilliseconds()).slice(-3);
      const length = format.match(/S/g).length;
      for (let i = 0; i < length; i++) format = format.replace(/S/, milliSeconds.substring(i, i + 1));
    }
    return format;
  }

  handleSubmit(e) {
    e.preventDefault();
    let data = {
      topic_id: this.props.topic.id,
      content : this.refs.comment_content.value.trim(),
    }

    axios.post('/comments', data, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.getElementsByName('csrf-token').item(0).content,
      }
    })
    .then(response => response.data)
    .then((data) => {
      window.scrollTo(0, 0);
      if (data.status === 'success') {
        this.setState({
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
    const updated_at = this.formatDate(new Date(this.props.topic.updated_at), 'YYYY-MM-DD hh:mm');

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
                  <li><strong><i className="icon-user"></i>&nbsp;○○さんの質問</strong></li>
                  {(() => {
                    if (this.props.topic.gender === 'male') {
                      return (<li className="glay"><strong><i className="icon-male"></i>&nbsp;男性</strong></li>);
                    } else {
                      return (<li className="glay"><strong><i className="icon-female"></i>&nbsp;女性</strong></li>);
                    }
                  })()}
                  <li className="glay"><strong><i className="icon-time"></i>&nbsp;{updated_at}</strong></li>
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
                        return <Link href={`/?tag=${tag.id}`} key={tag.id} className="marR5"><small className="btn btn-default btn-xs">{tag.name}</small></Link>;
                      });
                    }
                  })()}
                </p>
                <p className="text-center marT20 marB20"><a className="btn btn-primary" href="#comment-form">この質問に回答する</a></p>
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <strong><i className='icon-check-sign'></i>&nbsp;みんなの回答&nbsp;<span id="comment-count">{this.props.topic.comments.length}</span>件</strong>
                  </div>
                  <div className="panel-body" id="comment-area">
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
