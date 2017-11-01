import React from 'react';
import Link from './link';

export default class Header extends React.Component {

  constructor(props) {
    super(props);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.state = {
      spView: false,
      isOpen: false,
    }
  }

  componentDidMount() {
    this.judgeView();
    window.addEventListener('resize', () => {
      this.judgeView();
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isOpen: false,
    })
  }

  judgeView() {
    const flag = (window.innerWidth < 768)? true: false;
    this.setState({spView: flag });
  }

  toggleDrawer() {
    const flag = this.state.isOpen? false: true;
    this.setState({isOpen: flag });
  }

  render() {
    const openStyle = {
      display: 'block'
    }
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
          <div className="collapse navbar-collapse target" style={this.state.isOpen? openStyle: null}>
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
