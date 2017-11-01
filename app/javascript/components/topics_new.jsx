import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from "react-helmet";
import Messages from "./messages";
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
      availableModal: false,
      isModalOpen: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleContentFocus = this.handleContentFocus.bind(this);
    this.handleContentBlur = this.handleContentBlur.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleSubmitModal = this.handleSubmitModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ isModalOpen: true });
  }

  handleCloseModal() {
    this.setState({ isModalOpen: false });
  }

  handleSubmitModal() {
    this.handleCloseModal();

    let link_text = this.refs.link_text.value;
    let link_url = this.refs.link_url.value;
    if (!link_url || link_url.indexOf('http') === -1) return;
    if (!link_text) link_text = link_url;
    const link_string = `[${link_url}](${link_text})`;

    let content   = this.state.content;
    const len      = content.length;
    const pos      = this.state.selectPos;
    const before   = content.substr(0, pos);
    const after    = content.substr(pos, len);
    content = before + link_string + after;
    this.setState({ content: content});

  }

  handleContentFocus() {
    this.setState({ availableModal: true });
  }

  handleContentBlur() {
    setTimeout(() => {
      this.setState({ availableModal: false });
    }, 300);
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
                <textarea className="form-control" placeholder="質問内容を入力して下さい" rows="5" id="form-content" value={this.state.content} onChange={this.handleContentChange} onFocus={this.handleContentFocus} onBlur={this.handleContentBlur}></textarea>
                {(() => {
                  if (this.state.isModalOpen) {
                    return (
                      <div>
                        <div onClick={this.handleCloseModal} style={ModalWindow.styles.overlay} />
                        <div style={ModalWindow.styles.contentWrapper} className="modal-wrapper">
                          <div style={ModalWindow.styles.content}>
                            <div className="form-group">
                              <i className='icon-pencil'></i>&nbsp;<label htmlFor="link-url">URL</label>
                              <input type="text" className="form-control" placeholder="http://" id="link-url" ref='link_url' />
                            </div>
                            <div className="form-group">
                              <i className='icon-pencil'></i>&nbsp;<label htmlFor="link-text">リンク内テキスト</label>
                              <input type="text" className="form-control" placeholder="テキスト" id="link-text" ref='link_text' />
                            </div>
                            <div className="text-center">
                              <button onClick={this.handleCloseModal} className="btn btn-default btn-sm">キャンセル</button>
                              {' '}
                              <button onClick={this.handleSubmitModal} className="btn btn-primary btn-sm">確定</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  }
                })()}
                <div className="comment-link-btn btn btn-default btn-sm marT5" onClick={this.handleOpenModal} disabled={!this.state.availableModal}>
                  <i className='icon-link'></i>リンク追加
                </div>
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
