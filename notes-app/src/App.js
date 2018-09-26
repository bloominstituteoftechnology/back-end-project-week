import React, { Component } from 'react';
import './index.css';
import LeftNav from './Components/LeftNav/LeftNav';
import MainContent from './Components/MainContent/MainContent';


class App extends Component {
    render() {
        return (
            <div className="app_container">
            <div className="overlay"></div>
                <LeftNav />
                <MainContent />
            </div>
        )
    }
}

export default App; 


