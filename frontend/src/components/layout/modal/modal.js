import React from 'react';
import './modal.css';
import styled from 'styled-components';
import Delete from '@material-ui/icons/DeleteForever';
import Check from '@material-ui/icons/Check';

// import Axios from 'axios';

class ModalState extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false
		};
	}

	showModal = () => {
		this.setState({ show: true });
	};

	hideModal = () => {
		this.setState({ show: false });
	};

	render() {
		return (
			<main>
				<Modal show={this.state.show} handleClose={this.hideModal} deleteNote={this.props.deleteNote} />
				<StyledSVG>
					<Delete type="button" onClick={this.showModal} />
				</StyledSVG>
			</main>
		);
	}
}

const Modal = ({ handleClose, show, deleteNote }) => {
	const showHideClassName = show ? 'modal display-block' : 'modal display-none';

	return (
		<div className={showHideClassName}>
			<section className="modal-main">
				<div className="areYouSure">
					<p>Are You Sure you Want to delete this?</p>
				</div>
				<div className="buttons">
					<StyledDeleteButton>
						<Check onClick={deleteNote} />
					</StyledDeleteButton>
					<StyledButton onClick={handleClose}>X</StyledButton>
				</div>
			</section>
		</div>
	);
};

export const UnstyledButton = styled.button`
	border: 0;
	text-decoration: underline;
	font-weight: bold;
	background-color: transparent;

	cursor: pointer;
`;

export const StyledDeleteButton = styled.button`
	text-decoration: none;
	margin: 10px;
	width: 50px;
	height: 50px;
	border-radius: 50%;
	color: #ffffffff;
	background: #ca001a;
	border: 1px solid black;
	box-shadow: 5px 5px 30px -8px rgba(0, 0, 0, 0.75);

	font-size: 18px;
	cursor: pointer;
	&:hover {
		background: #000000;
		color: #ffffffff;
	}
`;

export const StyledButton = styled.button`
	text-decoration: none;
	margin: 10px;
	width: 50px;
	height: 50px;
	border-radius: 50%;
	color: #ffffffff;
	background: #24b8bd;
	border: 1px solid black;
	cursor: pointer;
	&:hover {
		background: #000000;
		color: #ffffffff;
	}
`;

export const StyledSVG = styled.svg`
	width: 30px;
	height: 25px;
	cursor: pointer;
	border: 4px solid rgba(70, 70, 70, 1);
	border-radius: 50%;
	margin-right: 5px;
	background: #ffffff;
	filter: invert(100%);
`;

export default ModalState;
