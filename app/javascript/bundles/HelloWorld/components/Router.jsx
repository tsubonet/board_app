import PropTypes from 'prop-types';
import React from 'react';
import Index from './index';
import Show from './show';


export default class Router extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      rootProps: this.props,
    };
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
