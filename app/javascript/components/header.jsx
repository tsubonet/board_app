import PropTypes from 'prop-types';
import React from 'react';
import Link from './link';

export default class Header extends React.Component {

  static contextTypes = {
    transitTo: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      spView: false,
      isOpen: false,
      drawerHeight: '',
    }
    this.toggleDrawer       = this.toggleDrawer.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  componentDidMount() {
    this.calcDrawerHeight();
    window.addEventListener('resize', () => {
      this.calcDrawerHeight();
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isOpen: false,
    })
  }

  calcDrawerHeight() {
    const flag = (window.innerWidth < 768)? true: false;
    this.setState({spView: flag });
    if (flag) {
      //################################################
      const toggleDrawer = this.refs.toggle_drawer;
      // #box のコピーを作る
      const copyBox = toggleDrawer.cloneNode(true);
      // #toggleDrawer の親ノードに挿入
      toggleDrawer.parentNode.appendChild(copyBox);
      // ひとまずみえなくする
      copyBox.style.cssText = "display:block; height:auto; visibility:hidden; " ;
      // コピーの高さを調べる
      const copyBoxH = copyBox.offsetHeight;
      // コピーした要素を削除する
      toggleDrawer.parentNode.removeChild(copyBox);
      //################################################
      this.setState({drawerHeight: copyBoxH});
    }
  }

  toggleDrawer() {
    const flag = this.state.isOpen? false: true;
    this.setState({isOpen: flag });
  }

  handleSearchSubmit(e) {
    e.preventDefault();
    this.context.transitTo(`/?query=${this.refs.search_text.value}`, { pushState: true });
    this.refs.search_text.value = '';
  }

  render() {
    const openStyle = {
      height: this.state.drawerHeight,
      visibility: "visible",
    };
    return (
      <header className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <Link href='/' className="navbar-brand"><i className="icon-male"></i><i className="icon-female"></i> 性のお悩み相談室 </Link>
            <button className="navbar-toggle" onClick={this.toggleDrawer}>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </div>
          <div className="collapse navbar-collapse target toggle-drawer" ref="toggle_drawer" style={this.state.isOpen? openStyle: null}>
            <ul className="nav navbar-nav">
              <li className="sp-only"><Link href='/topics/new'><i className="icon-comment"></i>&nbsp;質問する</Link></li>
              {(() => {
                if (this.props.currentUser !== null) {
                  return <li><Link href='/?order=mine'><i className="icon-comment"></i>&nbsp;あなたの投稿</Link></li>;
                }
              })()}
              <li><Link href='/?order=new'><i className="icon-user"></i>&nbsp;回答募集&nbsp;<span className="badge">{this.props.noCommentsCount}</span></Link></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li>
              <form onSubmit={this.handleSearchSubmit}>
                <div className="input-group">
                  <label className="sr-only control-label" htmlFor="topicSearch">Search</label>
                  <input className="form-control" placeholder="検索" maxLength="50" type="text" id="topicSearch" ref='search_text' required />
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
