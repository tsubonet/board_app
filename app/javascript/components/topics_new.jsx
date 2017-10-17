import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from "react-helmet";
import Link from './link';
import Topic from './topic';

export default class TopicsNew extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      topics: this.props.topics,
      currentPage: this.props.currentPage,
      totalPages: this.props.totalPages,
      hasPrevPage: this.props.hasPrevPage,
      hasNextPage: this.props.hasNextPage,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      topics: nextProps.topics,
      currentPage: nextProps.currentPage,
      totalPages: nextProps.totalPages,
      hasPrevPage: nextProps.hasPrevPage,
      hasNextPage: nextProps.hasNextPage,
    });
  }

  // componentDidMount() {
  //   console.log("here");
  // }

  // updateName = (name) => {
  //   this.setState({ name });
  // };

  render() {
    return (
      <div>
        <Helmet>
          <title>New</title>
        </Helmet>
        <div className="row">
          <div className="col-md-8">

          </div>

          <div className="col-md-4">
          </div>
        </div>

        <Link href="/topics/show">topics/show</Link>
      </div>
    );
  }
}
