import React, { Component } from 'react';
import SideBar from '../SideBar/SideBar';
import NoteList from '../NoteList/NoteList';
import NewNote from '../NewNote/NewNote';
import ViewNote from '../ViewNote/ViewNote';
import EditNote from '../EditNote/EditNote';
import './MainContainer.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { connect } from 'react-redux';

const notesArray = {

};

const routes = [
    {
        path: '/',
        component: NoteList,
        exact: true
    },
    {
        path: '/new',
        component: NewNote,
        exact: true,
        initialData: notesArray  
    },
    {
        path: '/view/:id',
        component: ViewNote,
        exact: false,
        initialData: notesArray
    },
    {
        path: '/edit/:id',
        component: EditNote,
        exact: true,
        initialData: notesArray
        // fetchInitialData: (id) => fetchSettings(id),
    },
]


class MainContainer extends Component {
    constructor() {
        super();
        this.state = {

        }
    }    

    render() {
        return (
            <Router>
                <div className="main-container">
                    <SideBar />
                    {routes.map(({path,component: C, exact, initialData}) => (
                        <Route 
                            path={path}
                            key={path}
                            render={(props) => <C {...props} initialData={initialData} />}
                            exact={exact}
                        />
                    ))}

                    {/* <Route exact path="/" component={NoteList}/>
                    <Route exact path="/new" component={NewNote} />
                    <Route path="/view/:id" component={ViewNote} />
                    <Route exact path="/edit" component={EditNote} /> */}
                </div>
            </Router>
        )
    }
}

// const mapStateToProps = state => {
//     return {
//         notes: state.notes
//     };
// };

export default MainContainer;