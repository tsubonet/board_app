import PropTypes from 'prop-types';
import React from 'react';
import NProgress from "nprogress";

import Header from './header';
import TopicsIndex from './topics_index';
import TopicsNew from './topics_new';
import TopicsShow from './topics_show';
import { sendGet, setUserId } from "./utils";

export default class Router extends React.Component {

  static childContextTypes = {
    rootProps: PropTypes.object,
    onLinkClick: PropTypes.func,
    transitTo: PropTypes.func,
  }

  constructor(...args) {
    super(...args);
    console.log(this.props);
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
    setUserId();
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
    sendGet(url)
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
