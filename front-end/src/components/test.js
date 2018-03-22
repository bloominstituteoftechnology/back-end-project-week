import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

export default class Test extends Component {
    render() {
        return (
            <Pagination>
                <PaginationItem>
                    <PaginationLink previous href="/" />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="/signup">Sign Up</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="/signin">Sign In</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="/notes">Notes</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="/users">Users</PaginationLink>
                </PaginationItem>
            </Pagination>
        );
    }
}
