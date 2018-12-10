import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Notes from './components/notes/Notes.js';
import Sidebar from './components/layout/Sidebar';
import AddNote from './components/layout/AddNote';

import styled from 'styled-components';

const App = () => {
	return (
		<React.Fragment>
			<Route path="*" component={Sidebar} />
			<StyledContainer className="container">
				<Route exact path="/" component={AddNote} />
				<Route exact path="/" component={Notes} />
			</StyledContainer>
		</React.Fragment>
	);
};

export default App;

const StyledContainer = styled.div`
	position: relative;
	bottom: 20em;
	padding-left: 4em;
`;
