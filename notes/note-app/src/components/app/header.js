import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

// import { headerClicked } from '../../actions';

class Header extends Component {
  headerClickedHandler = _ => {
    // this.props.headerClicked();
  };

  render() {
    return (
      <NavLink to="/" className="Header" onClick={this.headerClickedHandler}>
        Notes&reg;
      </NavLink>
    );
  }
}

// const mapStateToProps = state => {
//   return {};
// };

// export default connect(mapStateToProps, { headerClicked })(Header);
export default Header;
