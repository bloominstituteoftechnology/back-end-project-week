import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ModalState from '../layout/modal/modal';
import Edit from '@material-ui/icons/Create';
import Check from '@material-ui/icons/Check';
import Button from '@material-ui/core/Button';

import styled from 'styled-components';

const styles = (theme) => ({
	button: {
		margin: theme.spacing.unit
	},
	extendedIcon: {
		marginRight: theme.spacing.unit
	}
});

class Note extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hovering: false,
			userIsEditing: false
		};
	}

	toggleEditing = () => {
		const userIsEditing = !this.state.userIsEditing;
		this.setState({ userIsEditing });
	};

	render() {
		const { props } = this;
		const { hovering, userIsEditing } = this.state;
		const handleMouseEnter = () => this.setState({ hovering: true });
		const handleMouseLeave = () => this.setState({ hovering: false });
		const icons = [
			<StyledSVG key={0} alt="Edit" onClick={this.toggleEditing}>
				<Edit />
			</StyledSVG>,
			<ModalState key={1} alt="Delete" deleteNote={props.deleteNote} />
		];
		if (userIsEditing) {
			const { classes } = props;
			return (
				<div key={props._id} className="col-md-6">
					<div className="card mb-4 shadow-sm">
						<StyledCardContainer
							tabIndex={props._id}
							className="card-body"
							onMouseEnter={handleMouseEnter}
							onMouseLeave={handleMouseLeave}
						>
							<StyledIconContainer>{icons.map((icon) => (hovering ? icon : null))}</StyledIconContainer>
							<form onSubmit={props.handleSubmit}>
								<StyledTextAreaTitle
									name="editTitle"
									defaultValue={props.title}
									label={props.title}
									onChange={props.handleChange}
								/>
								<div className="card-text">
									<StyledTextAreaBody
										name="editBody"
										defaultValue={props.textBody}
										label={props.textBody}
										onChange={props.handleChange}
									/>
								</div>
								<Button
									type="submit"
									variant="fab"
									color="secondary"
									aria-label="Edit"
									className={classes.button}
								>
									<Check />
								</Button>
							</form>
						</StyledCardContainer>
					</div>
				</div>
			);
		} else {
			return (
				<div key={props.id} className="col-md-6">
					<div className="card mb-4 shadow-sm">
						<StyledCardContainer
							tabIndex={props.id}
							className="card-body"
							onMouseEnter={handleMouseEnter}
							onMouseLeave={handleMouseLeave}
						>
							<StyledIconContainer>{icons.map((icon) => (hovering ? icon : null))}</StyledIconContainer>
							<h1>{props.title}</h1>
							<StyledCard className="card-text">
								<p>{props.textBody}</p>
							</StyledCard>
							<StyledTimeCont>
								<p>Posted: {props.created_at}</p>
							</StyledTimeCont>
						</StyledCardContainer>
					</div>
				</div>
			);
		}
	}
}

export default withStyles(styles)(Note);

export const StyledTimeCont = styled.div`
	font-size: 12px;
	font-style: cursive;
	display: flex;
	width: 100%;
	justify-content: flex-end;
	align-items: flex-end;

	p {
		font-style: italic;
		font-weight: 12px;
	}
`;

export const StyledIconContainer = styled.div`
	position: absolute;
	display: flex;
	justify-content: space-around;
	top: -1em;
	height: 15px;
	width: 100%;
`;

export const StyledCard = styled.div`
	height: 74%;
	overflow: hidden;
	text-overflow: ellipsis;
`;

export const StyledCardContainer = styled.div`
	height: 297px;
	overflow: hidden;
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

export const StyledTextAreaTitle = styled.textarea`
	width: 400px;
	height: 25px;
	margin-bottom: 30px;
`;

export const StyledTextAreaBody = styled.textarea`
	width: 400px;
	height: 136px;
`;
