import React from 'react';
import './App.css';
import Notes from './components/notes/Notes.js';
import Sidebar from './components/layout/Sidebar';
import AddNote from './components/layout/AddNote';

import styled from 'styled-components';

const App = () => {
	return (
		<React.Fragment>
			<Sidebar />
			<StyledContainer className="container">
				<AddNote />
				<Notes />
			</StyledContainer>
		</React.Fragment>
	);
};

export default App;

const StyledContainer = styled.div`
	position: relative;
	width: 100%;
	bottom: 20em;
`;
