import React from 'react';
import Link from './link';

export default class Footer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer>
        <div className="container">
          <p className="text-right">
            <small><a href="mailto:tsubonet@gmail.com"><i className="icon-double-angle-right"></i> お問い合わせ</a></small><br />
            <small>Copyright &copy; 2017 性のお悩み相談室 All Rights Reserved.</small>
          </p>
        </div>
        <p id="page-top"><a href="#container"><span className="icon-chevron-up"></span><br />TOP</a></p>
      </footer>
    )
  }
}
