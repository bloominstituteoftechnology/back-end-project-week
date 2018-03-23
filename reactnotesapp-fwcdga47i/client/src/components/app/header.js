import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { resetErrors } from '../../actions';

class Header extends Component {
  headerClickedHandler = _ => {
    this.props.resetErrors();
  };

  render() {
    return (
      <NavLink to="/" className="Header" onClick={this.headerClickedHandler}>
        &reg;Notes
      </NavLink>
    );
  }
}

const mapStateToProps = state => {
  return {
    //
  };
};

export default connect(mapStateToProps, { resetErrors })(Header);
