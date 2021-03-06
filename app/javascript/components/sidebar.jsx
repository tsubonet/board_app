import PropTypes from 'prop-types';
import React from 'react';
import Link from './link';
import { sendGet } from "./utils";

export default class SideBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rankingStatus: 'ranking_weekly',
      rankingTopics: this.props.rankingTopics,
    };
    this.switchTab = this.switchTab.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      rankingTopics: nextProps.rankingTopics,
    });
  }

  switchTab(e) {
    e.preventDefault();
    const target = e.target.getAttribute('data-role');
    this.setState({ rankingStatus: target });
    sendGet('/topics/'+ target)
    .then((response) => {
      this.setState({ rankingTopics: response });
    });

  }

  render() {
    return (
      <div>
        <div className="panel panel-primary">
          <div className="panel-heading"><strong><i className='icon-check-sign'></i> 性のお悩み相談室とは <i className="icon-question"></i></strong></div>
          <div className="panel-body">
            人に相談しにくい性の悩みを解決する完全匿名Q&amp;Aサービスです。<br />
            <div className="text-center marT10"><Link href='/topics/new' className="btn btn-primary"><i className="icon-comment"></i> 質問する</Link></div>
          </div>
        </div>
        {
        //<div className="panel panel-default">
        //  <div className="panel-body text-center">
        //    <script type="text/javascript" src="http://adm.shinobi.jp/s/34120a0bc1f29a240dbbc6772e6e52a0"></script>
        //  </div>
        //</div>
        }
        <div className="panel panel-default">
          <div className="panel-heading"><strong><i className='icon-check-sign'></i> カテゴリー一覧</strong></div>
          <div className="panel-body">
          {this.props.tags.map((tag, i) => {
            return <Link key={tag.id} className="tag-link" href={`/?tag=${tag.id}`}><small className="btn btn-default btn-xs"><span className="label label-primary">{tag.topic_tags_count}</span> {tag.name}</small></Link>;
          })}
          </div>
        </div>
        <div className="panel panel-default">
          <div className="panel-heading ranking-area">
            <strong><i className='icon-check-sign'></i> PVランキング</strong>
            <div className="btn-group btn-group-sm" id="tabs">
              <button type="button" className={`btn ${this.state.rankingStatus === 'ranking_weekly'?  'btn-primary': 'btn-default'}`} data-role="ranking_weekly" onClick={this.switchTab}>週間</button>
              <button type="button" className={`btn ${this.state.rankingStatus === 'ranking_monthly'? 'btn-primary': 'btn-default'}`} data-role="ranking_monthly" onClick={this.switchTab}>月間</button>
              <button type="button" className={`btn ${this.state.rankingStatus === 'ranking_all'?     'btn-primary': 'btn-default'}`} data-role="ranking_all" onClick={this.switchTab}>すべて</button>
            </div>
          </div>
          <div className="list-group tab-content">
          {(() => {
            if (this.state.rankingTopics.length) {
              return this.state.rankingTopics.map((topic, i) => {
                return (
                  <Link className="list-group-item" href={`/topics/${topic.id}`} key={topic.id}>
                  <h5 className="list-group-item-heading">
                    <i className="icon-comment"></i> <strong>{topic.title}</strong>
                  </h5>
                  <p className="list-group-item-text">{topic.content}</p>
                  <ul className="list-group-item-text list-inline side-element">
                    <li><small><i className="icon-comments"></i> 回答 : {topic.comments_count}</small></li>
                    <li><small><i className="icon-eye-open"></i> views : {topic.impressions_count}</small></li>
                    {(() => {
                      if (topic.gender === 'male') {
                        return (<li><small><i className="icon-male"></i>&nbsp;男性</small></li>);
                      } else {
                        return (<li><small><i className="icon-female"></i>&nbsp;女性</small></li>);
                      }
                    })()}
                  </ul>
                  <div className="side-entry-arrow"><i className="icon-chevron-right"></i></div>
                  </Link>
                )
              });
            } else {
              return (<p className="list-group-item">投稿された記事がありません。</p>);
            }
          })()}
          </div>
        </div>
      </div>
    );
  }
}
