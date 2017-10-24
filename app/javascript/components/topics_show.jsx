import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from "react-helmet";
import Link from './link';


export default class TopicsShow extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired, // this is passed from the Rails view
  };

  /**
   * @param props - Comes from your rails view.
   */
  constructor(props) {
    super(props);

    // How to set initial state in ES6 class syntax
    // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
    this.state = { name: this.props.name };
  }

  updateName = (name) => {
    this.setState({ name });
  };

  render() {
    return (
      <div>
        <Helmet>
          <title>Show</title>
        </Helmet>
        <div class="row">
          <div class="col-md-8">
              <div class="panel panel-default">

                
              </div>
          </div>

          <div class="col-md-4">
          </div>
        </div>
      </div>
    );
  }
}
