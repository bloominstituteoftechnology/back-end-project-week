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
import Test from './test';
import Greeting from './greeting';

export default class NavBar extends Component {
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
                        Lambda-Notes
                    </NavbarBrand>
                    <NavbarToggler
                        onClick={this.toggleNavbar}
                        className="mr-2"
                    />
                    <Collapse isOpen={!this.state.collapsed} navbar>
                        <Nav navbar>
                            <NavItem>
                                <Test />
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://github.com/groov1234/lambda-notes">
                                    Github
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
                <Greeting />
            </div>
        );
    }
}
