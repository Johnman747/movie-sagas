import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router';

class Home extends Component {
    render() {
      return (
        <div>
          <p>Admin</p>
        </div>
      );
    }
  }
  const mapStateToProps = reduxState => ({
    reduxState,
});
  export default withRouter(connect(mapStateToProps)(Home));