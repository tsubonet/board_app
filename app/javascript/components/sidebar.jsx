import PropTypes from 'prop-types';
import React from 'react';
import Link from './link';

export default class SideBar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="panel panel-primary">
          <div className="panel-heading"><strong><i className='icon-check-sign'></i> SexeSとは <i className="icon-question"></i></strong></div>
          <div className="panel-body">
            相談しにくい性の悩みを解決する匿名Q&amp;Aサービスです。<br />
            <div className="text-center marT10"><Link href='/topics/new' className="btn btn-primary"><i className="icon-comment"></i> 質問する</Link></div>
          </div>
        </div>
        <div className="panel panel-default">
          <div className="panel-body text-center">
            {
            //<script type="text/javascript" src="http://adm.shinobi.jp/s/34120a0bc1f29a240dbbc6772e6e52a0"></script>
            }
          </div>
        </div>
        <div className="panel panel-default">
          <div className="panel-heading"><strong><i className='icon-check-sign'></i> カテゴリー一覧</strong></div>
          <div className="panel-body">
{
  //              <a style="display: inline-block; padding-top: 2px; padding-bottom: 2px;" href="/topics/?tag=<?php echo $tag['Tag']['id'] ?>"><small className="btn btn-default btn-xs"><span className="label label-primary"><?php echo count($tag['TopicTag']) ?></span> <?php echo $tag['Tag']['name'] ?></small></a>  
}


            </div>
        </div>
      </div>
    );
  }
}
