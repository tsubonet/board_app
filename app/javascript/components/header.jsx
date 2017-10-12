import React from 'react';
import Link from './link';

export default class Header extends React.Component {
  render() {
    return (
      <header className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <a href='/' className="navbar-brand"><i className="icon-male"></i> SexeS <i className="icon-female"></i></a>
            <button className="navbar-toggle" data-toggle="collapse" data-target=".target">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </div>
          <div className="collapse navbar-collapse target">
            <ul className="nav navbar-nav">
              <li><a href='/topics/add'><i className="icon-comment"></i>&nbsp;質問する</a></li>
              <li><a href='/topics/?order=new'><i className="icon-user"></i>&nbsp;回答募集 <span className="badge"></span></a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li>
              <form action="/topics" id="TopicIndexForm" method="post" accept-charset="utf-8">
                <div><input type="hidden" name="_method" value="POST" /></div>
                <div className="input-group">
                  <label className="sr-only control-label" for="TopicTitle">Search</label>
                  <input name="data[Topic][keyword]" className="form-control" placeholder="検索" maxlength="50" type="text" id="TopicTitle" required="required" />
                  <span className="input-group-btn"><button type="submit" className="btn btn-primary"><i className="icon-search"></i></button></span>
                </div>
              </form>
              </li>
            </ul>
          </div>
        </div>
      </header>
    )
  }
}
