import React, { Component } from 'react';
import * as actions from './actions';

const Context = React.createContext();

export const Consumer = Context.Consumer;

export class Provider extends Component {
	state = {
		notes: [],
		noteId: '',
		searchTitle: '',
		title: '',
		textBody: '',
		editTitle: '',
		editBody: ''
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
