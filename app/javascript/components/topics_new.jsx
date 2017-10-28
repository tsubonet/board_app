import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from "react-helmet";
import Messages from "./messages";
import { sendPost } from "./utils";

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
      tag_ids: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let tag_ids = Object.assign([], this.state.tag_ids);
    if(e.target.checked) {
      // 追加処理
      tag_ids.push(e.target.value);
    } else {
      // 削除処理
      const index = tag_ids.indexOf(e.target.value);
      tag_ids.splice(index, 1);
    }
    this.setState({tag_ids: tag_ids});
  }

  handleSubmit(e) {
    e.preventDefault();
    let data = {
      user    : localStorage.user_id,
      gender  : this.refs.gender.value.trim(),
      title   : this.refs.title.value.trim(),
      content : this.refs.content.value.trim(),
      tag_ids : this.state.tag_ids,
    }
    sendPost('/topics', data)
    .then((data) => {
      if (data.status === 'success') {
        this.context.transitTo('/', { pushState: true }, { messages: { status: 'success', txt: data.txt }});
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
        <div className="row">
          <div className="col-md-8">
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
                    <input type="text" className="form-control" placeholder="タイトルを入力して下さい" id="form-title" ref="title" />
                  </div>
                  <div className="form-group">
                    <i className='icon-pencil'></i>&nbsp;<label htmlFor="form-content">質問内容</label>&nbsp;<span className="label label-primary">必須</span>&nbsp;<span className="label label-primary">全角1000文字まで</span>
                    <textarea className="form-control" placeholder="質問内容を入力して下さい" rows="5" id="form-content" ref="content"></textarea>
                  </div>
                  <div className="form-group">
                    <div><i className="icon-pencil"></i>&nbsp;<label htmlFor="TagTag">カテゴリー</label>&nbsp;<span className="label label-default">任意</span>&nbsp;<span className="label label-default">複数可</span></div>
                    {this.props.tags.map((tag, i) => {
                      return (
                        <div className="checkbox wrap-checkbox" key={tag.id}>
                          <label><input type="checkbox" value={tag.id} onChange={this.handleChange} />&nbsp;{tag.name}</label>
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

          <div className="col-md-4">
          </div>
        </div>
      </div>
    );
  }
}
