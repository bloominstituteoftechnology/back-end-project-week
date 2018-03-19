import React from 'react';
import UpdateNote from '../components/update-note';

export default function Note(props) {
	return (
		<div>
			<button onClick={() => props.handleShowNote({})}>
				{`Hide ${props.selected.title}?`}
			</button>
			<h4>{props.selected.title}</h4>
			<div>{props.selected.body}</div>
			<button onClick={() => props.toggleShowUpdate()}>
				{`Update ${props.selected.title}?`}
			</button>
		</div>
	);
};