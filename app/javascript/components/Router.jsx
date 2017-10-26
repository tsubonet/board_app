import PropTypes from 'prop-types';
import React from 'react';
import axios from 'axios';
import NProgress from "nprogress";

import Header from './header';
import TopicsIndex from './topics_index';
import TopicsNew from './topics_new';
import TopicsShow from './topics_show';

export default class Router extends React.Component {

  static childContextTypes = {
    rootProps: PropTypes.object,
    onLinkClick: PropTypes.func,
    transitTo: PropTypes.func,
  }

  constructor(...args) {
    super(...args);
    this.state = {
      rootProps: this.props,
    };
  }

  getChildContext() {
    return {
      rootProps: this.state.rootProps,
      onLinkClick: this.onLinkClick.bind(this),
      transitTo: this.transitTo.bind(this),
    };
  }

  componentDidMount() {
    window.addEventListener("popstate", () => {
      this.transitTo(document.location.href, { pushState: false });
    });
    this.setUserId();
  }

  setUserId() {
    if (typeof localStorage.user_id !== 'undefined') return;
    const str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const len = 8;
    let result = "";
    for (let i = 0; i < len; i++) {
      result += str.charAt(Math.floor(Math.random() * str.length));
    }
    localStorage.user_id = result;
  }

  onLinkClick(event) {
    if (!event.metaKey) {
      event.preventDefault();
      const anchorElement = event.currentTarget.pathname ? event.currentTarget : event.currentTarget.querySelector("a");
      this.transitTo(anchorElement.href, { pushState: true });
    }
  }

  transitTo(url, { pushState }, data = {}) {
    NProgress.start();
    axios.get(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.getElementsByName('csrf-token').item(0).content,
      }
    })
    .then(response => response.data)
    .then((rootProps) => {
      if (pushState) {
        history.pushState(data, "", url);
      }
      this.setState({ rootProps });
    }).then(() => {
      window.scrollTo(0, 0);
      NProgress.done();
    }).catch(() => {
      NProgress.done();
    });
  }

  getComponent() {
    switch (this.state.rootProps.actionPath) {
      case "topics#index":
        return TopicsIndex;
      case "topics#new":
        return TopicsNew;
      case "topics#show":
        return TopicsShow;
    }
  }

  render() {
    const Component = this.getComponent();
    return (
      <div>
        <Header noCommentsCount={this.state.rootProps.noCommentsCount} />
        <section>
          <div className="container marT70">
            <Component {...this.state.rootProps} />
          </div>
        </section>
      </div>
    )
  }
}
