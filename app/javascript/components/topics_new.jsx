import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from "react-helmet";
import Link from './link';
import Topic from './topic';

export default class TopicsNew extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      topics: this.props.topics,
      currentPage: this.props.currentPage,
      totalPages: this.props.totalPages,
      hasPrevPage: this.props.hasPrevPage,
      hasNextPage: this.props.hasNextPage,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      topics: nextProps.topics,
      currentPage: nextProps.currentPage,
      totalPages: nextProps.totalPages,
      hasPrevPage: nextProps.hasPrevPage,
      hasNextPage: nextProps.hasNextPage,
    });
  }

  // componentDidMount() {
  //   console.log("here");
  // }

  // updateName = (name) => {
  //   this.setState({ name });
  // };

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
                <form>
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

        <Link href="/topics/show">topics/show</Link>
      </div>
    );
  }
}
