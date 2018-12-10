import React, { Component } from 'react';
import * as actions from './actions';

const Context = React.createContext();

export const Consumer = Context.Consumer;

// export const reducer = (state, action) => {
// 	switch (action.type) {
// 		case 'SET_SEARCH_TERM':
// 			return {
// 				...state,
// 				searchTerm: action.params
// 			};
// 		case 'ADD_NOTE':
// 			return {
// 				...state,
// 				notes: [ ...action.payload ]
// 			};
// 		case 'GET_ALL_NOTES':
// 			return {
// 				...state,
// 				notes: action.payload
// 			};
// 		case 'EDIT_NOTE':
// 			return {
// 				...state,
// 				notes: action.payload
// 			};
// 		default:
// 			return state;
// 	}
// };

export class Provider extends Component {
	state = {
		notes: [],
		noteId: '',
		searchTitle: '',
		title: '',
		textBody: '',
		editTitle: '',
		editBody: ''
		// dispatch: (action) => this.setState((state) => reducer(state, action))
	};

	//attaches actions from import and binds to the Provider class
	attachMethods = (data_obj) => {
		return Object.keys(data_obj).reduce((obj, prop) => {
			obj[prop] = data_obj[prop].bind(this);
			return obj;
		}, {});
	};

	render() {
		return (
			<Context.Provider
				value={{
					//spreads in all state
					...this.state,
					//spreads in all methods0.
					...this.attachMethods(actions)
				}}
			>
				{this.props.children}
			</Context.Provider>
		);
	}
}

// connects store letting you apply context to entire classes instead of just props
export const connectStore = (DependentComponent) => {
	return class extends Component {
		render() {
			return <Consumer>{(context) => <DependentComponent {...context} />}</Consumer>;
		}
	};
};
