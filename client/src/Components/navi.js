import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import { connect } from 'react-redux';

import { loggedOut } from '../Actions';

class Navi extends Component {
    logOut = event => {
        event.preventDefault();
        this.props.loggedOut();
    };

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }
    render() {
        return (
            <div>
                <Navbar color="faded" light>
                    <NavbarBrand href="/" className="mr-auto">
                        <h3>Lambda-Notes</h3>
                    </NavbarBrand>
                    <NavbarToggler
                        onClick={this.toggleNavbar}
                        className="mr-2"
                    />
                    <Collapse isOpen={!this.state.collapsed} navbar>
                        <Nav
                            className="text-right
                                    mr-2"
                            navbar
                        >
                            <NavItem>
                                <NavLink href="https://github.com/groov1234/lambda-notes">
                                    Github
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/" onClick={this.logOut}>
                                    Sign Out
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.loggedIn
    };
};

export default connect(mapStateToProps, { loggedOut })(Navi);
