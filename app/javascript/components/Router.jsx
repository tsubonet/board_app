import PropTypes from 'prop-types';
import React from 'react';
import axios from 'axios';
import NProgress from "nprogress";

import Index from './index';
import Show from './show';

export default class Router extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {
      rootProps: this.props,
    };
  }

  static childContextTypes = {
    onLinkClick: PropTypes.func,
    rootProps: PropTypes.object,
  }

  getChildContext() {
    return {
      onLinkClick: this.onLinkClick.bind(this),
      rootProps: this.state.rootProps,
    };
  }

  componentDidMount() {
    window.addEventListener("popstate", () => {
      this.transitTo(document.location.href, { pushState: false });
    });
  }

  onLinkClick(event) {
    if (!event.metaKey) {
      event.preventDefault();
      const anchorElement = event.currentTarget.pathname ? event.currentTarget : event.currentTarget.querySelector("a");
      this.transitTo(anchorElement.href, { pushState: true });
    }
  }

  transitTo(url, { pushState }) {
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
        history.pushState({}, "", url);
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
      case "hello_world#index":
        return Index;
      case "hello_world#show":
        return Show;
    }
  }

  render() {
    const Component = this.getComponent();
    return <Component {...this.state.rootProps}/>
  }
}
