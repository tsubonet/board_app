import React from 'react';
import Link from './link';
import { smoothScroll } from "./utils";

export default class Footer extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.refs.page_top.addEventListener('click', () => {
      smoothScroll.scrollTo('container')
    })
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
        <p id="page-top"><a ref="page_top"><span className="icon-chevron-up"></span><br />TOP</a></p>
      </footer>
    )
  }
}
