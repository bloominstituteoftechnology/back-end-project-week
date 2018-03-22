import React from 'react';
import { Jumbotron, Button } from 'reactstrap';

const Greeting = props => {
    return (
        <div>
            <Jumbotron>
                <h1 className="display-3">Welcome to Lambda-Notes</h1>
                <p className="lead">Click the hamburger and sign up</p>
                <hr className="my-2" />
                <p>Then sign in and have a look around</p>
                <p className="lead">
                    <Button
                        href="https://github.com/groov1234/lambda-notes"
                        color="primary"
                    >
                        Learn More
                    </Button>
                </p>
            </Jumbotron>
        </div>
    );
};

export default Greeting;
