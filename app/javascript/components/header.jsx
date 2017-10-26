import React from 'react';
import Link from './link';

export default class Header extends React.Component {
  render() {
    return (
      <header className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <Link href='/' className="navbar-brand"><i className="icon-male"></i><i className="icon-female"></i> 性のお悩み相談室 </Link>
            <button className="navbar-toggle">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </div>
          <div className="collapse navbar-collapse target">
            <ul className="nav navbar-nav">
              <li><Link href='/topics/new'><i className="icon-comment"></i>&nbsp;質問する</Link></li>
              <li><Link href='/?order=new'><i className="icon-user"></i>&nbsp;回答募集&nbsp;<span className="badge">{this.props.noCommentsCount}</span></Link></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li>
              <form action="/topics" id="TopicIndexForm" method="post">
                <div className="input-group">
                  <label className="sr-only control-label" htmlFor="TopicSearch">Search</label>
                  <input name="#" className="form-control" placeholder="検索" maxLength="50" type="text" id="TopicSearch" required />
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
