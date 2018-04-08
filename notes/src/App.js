import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Notes from './components/Notes';
import {Row, Grid, Col} from 'react-bootstrap';
import styled from 'styled-components';
import CreateNewNoteForm from './components/CreateNewNoteForm';
import Search from './components/Search';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Details from './components/Details';
import UpdateNote from './components/UpdateNote';
import SearchResults from './components/SearchResults';
import {connect} from 'react-redux';
import {logOut} from './actions';
import {setUserInfo} from './actions';
import SecureRoute from './components/SecureRoute';

class App extends Component {

    state = {
        userName: ''
    };

    componentWillMount() {
        const resp = JSON.parse(sessionStorage.getItem('user'));
        if (resp !== null ) {
            this.props.setUserInfo(resp.data);
            if(resp.data !== undefined) {
                this.setState({
                    userName: resp.data.user.name
                });
            }

        }
    }

    logOut = () => {
        sessionStorage.clear();
        this.props.logOut();
    };


    render() {
        return (
            <AppContainer>
                <Router>
                    <Grid>
                        <Row className="show-grid">
                            <Col xs={6} md={3} className={"sidebar"}>

                                <div className={'title-side'}>
                                    Lambda Notes
                                </div>

                                {(this.state.userName !== '')
                                    ?
                                    <div>
                                        {this.state.userName}
                                    </div>
                                    :
                                    ''
                                }

                                <div className={'btn-side'}>
                                    <Link to="/" className={"btn-text"}> View Your Notes </Link>
                                </div>

                                <div className={'btn-side'}>
                                    <Link to="/create_new_note" className={"btn-text"}> + Create New Note</Link>
                                </div>

                                {(this.state.userName !== '')
                                    ?
                                    <div className={'btn-side'}>
                                        <div onClick={() => {
                                            this.logOut()
                                        }} className={"btn-text"}> - LogOut
                                        </div>
                                    </div>
                                    :
                                    <div className={'btn-side'}>
                                        <Link to="/sign_up" className={"btn-text"}> + Sign Up</Link>
                                    </div>
                                }


                            </Col>
                            <Col xs={12} md={9} className={"components-container"}>
                                {this.props.searching
                                    ? <SearchResults/>
                                    :
                                    <div>
                                        <Route exact path="/" component={Notes}/>
                                        <Route path="/create_new_note" component={SecureRoute(CreateNewNoteForm)}/>
                                        <Route path="/details/:id" component={Details}/>
                                        <Route path="/update/:id" component={UpdateNote}/>
                                        <Route path="/sign_up" component={SignUp}/>
                                        <Route path="/sign_in" component={SignIn}/>

                                    </div>
                                }

                            </Col>
                            <Col xs={12} md={4} className={"top-bar-container"}>
                                <Search/>
                            </Col>

                        </Row>

                    </Grid>
                </Router>
            </AppContainer>

        );
    }
}


const mapStateToProps = state => {
    const {notes_reducer, users_reducer} = state;
    return {
        searching: notes_reducer.searching,
        userInfo: users_reducer.user_info,
    }
};
export default connect(mapStateToProps, {logOut, setUserInfo})(App);


const AppContainer = styled.div`

    font-family: verdana;
    font-stretch: condensed;
        
        .top-bar-container{
            border:0px solid black;
            position:absolute;
            height:40px;
            margin-left:20%;
            top:15px;
            padding-left:22px;
        }
    
        .sidebar {
            border:1px solid #A0A0A0;
            background-color: #d8d8d8;
            padding:18px;
            text-align:center;
            font-weight: bold;


                .title-side{
                    text-align:left;
                    color:#4a4a4a;
                    font-size:40px;
                    line-height: 0.9em;
                    margin-bottom:30px;
                    font-stretch: condensed;
                }
        }
        
        .components-container{
            border:1px solid #C2C2C2;
            background-color: #f3f3f3;
            padding-top:60px;
            min-height: 750px;
        }
`;