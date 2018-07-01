import React from "react";
import { Link, withRouter } from "react-router-dom";

class Header extends React.Component {

  signout = () => {
    if (localStorage.getItem('jwt')) {
      localStorage.removeItem('jwt');

      this.props.history.push('/signin');
    }
  };
  render() {
    return (
      <header>
        <nav>
          <div className="logo">
            <Link to="/posts"

            ><span >Lambda Notes</span></Link>
          </div>
          <div className="filter-wrapper">
            <input
              placeholder="Filter notes"
              className="filter"
            />
          </div>
          {localStorage.getItem('jwt') ? (
         <div onClick={this.signout} className="logout">
            <button>logout</button>
         </div>
          ): (
          <Link to="/signin">
            <div  className="logout">
              <button>sign in</button>
            </div>
          </Link>
       )}
        </nav>
      </header>
    )
  }
}

export default withRouter(Header);