import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from "react-helmet";
import Messages from "./messages";
import AddLink from "./add_link";
import { sendPost, ModalWindow } from "./utils";

export default class TopicsNew extends React.Component {

  static contextTypes = {
    transitTo: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      messages: {
        status: '',
        txt: [],
      },
      title: '',
      content: '',
      selectPos: '',
      tagIds: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleLinkSubmit = this.handleLinkSubmit.bind(this);
  }

  handleLinkSubmit(linkString) {
    let content   = this.state.content;
    const len     = content.length;
    const pos     = this.state.selectPos;
    const before  = content.substr(0, pos);
    const after   = content.substr(pos, len);
    content = before + linkString + after;
    this.setState({
      content: content
    });
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  handleContentChange(e) {
    this.setState({
      content: e.target.value,
      selectPos: e.target.selectionStart,
    });
  }

  handleTagChange(e) {
    let tagIds = Object.assign([], this.state.tagIds);
    if(e.target.checked) {
      // add
      tagIds.push(e.target.value);
    } else {
      // delete
      const index = tagIds.indexOf(e.target.value);
      tagIds.splice(index, 1);
    }
    this.setState({tagIds: tagIds});
  }

  handleSubmit(e) {
    e.preventDefault();
    let data = {
      user    : localStorage.user_id,
      gender  : this.refs.gender.value.trim(),
      title   : this.state.title,
      content : this.state.content,
      tag_ids : this.state.tagIds,
    }
    sendPost('/topics', data)
    .then((data) => {
      if (data.status === 'success') {
        this.context.transitTo('/', { pushState: true }, {
          messages: {
            status: 'success',
            txt: data.txt
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
    return (
      <div>
        <Helmet>
          <title>New</title>
        </Helmet>
        <Messages messages={this.state.messages} />
        <div className="panel panel-default">
          <div className="panel-heading"><strong><i className='icon-check-sign'></i>&nbsp;性の悩みについて質問する</strong></div>
          <div className="panel-body">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <i className='icon-pencil'></i>&nbsp;<label htmlFor="form-gender">性別</label>&nbsp;<span className="label label-primary">必須</span>
                <select className="form-control" id="form-gender" ref="gender">
                  <option value="male">男性</option>
                  <option value="female">女性</option>
                </select>
              </div>
              <div className="form-group">
                <i className='icon-pencil'></i>&nbsp;<label htmlFor="form-title">タイトル</label>&nbsp;<span className="label label-primary">必須</span>&nbsp;<span className="label label-primary">全角50文字まで</span>
                <input type="text" className="form-control" placeholder="タイトルを入力して下さい" id="form-title" value={this.state.title} onChange={this.handleTitleChange} />
              </div>
              <div className="form-group relative">
                <i className='icon-pencil'></i>&nbsp;<label htmlFor="form-content">質問内容</label>&nbsp;<span className="label label-primary">必須</span>&nbsp;<span className="label label-primary">全角1000文字まで</span>
                <textarea className="form-control" placeholder="質問内容を入力して下さい" rows="5" id="form-content" value={this.state.content} onChange={this.handleContentChange}></textarea>
                <AddLink
                  content={this.state.content}
                  selectPos={this.state.selectPos}
                  onLinkSubmit={this.handleLinkSubmit}
                />
              </div>
              <div className="form-group">
                <div><i className="icon-pencil"></i>&nbsp;<label htmlFor="TagTag">カテゴリー</label>&nbsp;<span className="label label-default">任意</span>&nbsp;<span className="label label-default">複数可</span></div>
                {this.props.tags.map((tag, i) => {
                  return (
                    <div className="checkbox wrap-checkbox" key={tag.id}>
                      <label><input type="checkbox" value={tag.id} onChange={this.handleTagChange} />&nbsp;{tag.name}</label>
                    </div>
                  );
                })}
              </div>
              <div className="form-group text-center">
                <input className="btn btn-primary btn-lg" type="submit" value="質問する" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
