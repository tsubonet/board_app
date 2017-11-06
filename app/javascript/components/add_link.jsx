import React from 'react';
import { modalWindow, formatPostString } from "./utils";

export default class AddLink extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: this.props.content,
      selectPos: this.props.selectPos,
      isModalOpen: false,
    };
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
    let linkText = formatPostString(this.refs.link_text.value);
    let linkUrl  = formatPostString(this.refs.link_url.value);
    if (!linkUrl || linkUrl.indexOf('http') === -1) return;
    if (!linkText) linkText = linkUrl;
    const linkString = `[${linkText}](${linkUrl})`;
    this.props.onLinkSubmit(linkString);
  }

  render() {
    return (
      <div>
        {(() => {
          if (this.state.isModalOpen) {
            return (
              <div>
                <div onClick={this.handleCloseModal} style={modalWindow.styles.overlay} />
                <div style={modalWindow.styles.contentWrapper} className="modal-wrapper">
                  <div style={modalWindow.styles.content}>
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
        <div className="comment-link-btn btn btn-default btn-sm marT5" onClick={this.handleOpenModal}>
          <i className='icon-link'></i>リンク追加
        </div>
      </div>
    );
  }
}
