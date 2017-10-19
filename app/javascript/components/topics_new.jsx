import PropTypes from 'prop-types';
import React from 'react';
import axios from 'axios';
import { Helmet } from "react-helmet";

export default class TopicsNew extends React.Component {

  static contextTypes = {
    transitTo: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const data = {
      gender  : this.refs.gender.value.trim(),
      title   : this.refs.title.value.trim(),
      content : this.refs.content.value.trim(),
    }

    axios.post('/topics', data, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.getElementsByName('csrf-token').item(0).content,
      }
    })
    .then((response) => {
      this.context.transitTo('/', { pushState: true });
    });


    return;
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>New</title>
        </Helmet>
        <div className="row">
          <div className="col-md-8">
            <div className="panel panel-default">
              <div className="panel-heading"><strong><i className='icon-check-sign'></i> 性の悩みについて質問する</strong></div>
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
                    <i className="icon-pencil"></i>&nbsp;<label htmlFor="TagTag">カテゴリー</label> <span className="label label-default">任意</span>&nbsp;<span className="label label-default">複数可</span>
                    {
                      //echo $this->Form->input('Tag', array('type'=> 'select','class'=> 'checkbox wrap-checkbox', 'multiple'=> 'checkbox', 'label'=>false, 'div'=> false, 'options'=> $tag_list, 'error' => false)); ?>
                    }
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
