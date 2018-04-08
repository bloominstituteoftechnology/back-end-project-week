import React, {Component} from 'react';
import { connect } from 'react-redux';

export default ComposedComponent => {
    class SecureRoute extends Component {
        componentWillMount() {
            if (!sessionStorage.getItem('user')) {
                this.props.history.push('/sign_in');
            }
        }

        render() {
            return (
                <div>

                    {console.log('this.props:::', this.props)}

                    {sessionStorage.getItem('user') ? (
                        <ComposedComponent {...this.props} />
                    ): null}
                </div>
            );
        }
    }

    const mapStateToProps = state => {
        return {
            authed: state.authed,
        };
    };

    return connect(mapStateToProps)(SecureRoute);
};