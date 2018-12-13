import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
// icons
import SearchIcon from '@material-ui/icons/Search';
// consumer
import { Consumer } from '../store/index';

const styles = (theme) => ({
	root: {
		display: 'flex',
		marginBottom: '100px'
	},

	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar
	},
	grow: {
		flexGrow: 1
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25)
		},
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing.unit,
			width: 'auto'
		}
	},
	searchIcon: {
		width: theme.spacing.unit * 9,
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	inputRoot: {
		color: 'inherit',
		width: '100%'
	},
	inputInput: {
		paddingTop: theme.spacing.unit,
		paddingRight: theme.spacing.unit,
		paddingBottom: theme.spacing.unit,
		paddingLeft: theme.spacing.unit * 10,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: 120,
			'&:focus': {
				width: 200
			}
		}
	},
	content: {
		marginTop: '180px',
		padding: theme.spacing.unit * 3
	},
	label: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		padding: theme.spacing.unit * 1.5,
		fontSize: '12px'
	}
});

class MiniDrawer extends React.Component {
	state = {
		open: false,
		searchTitle: ''
	};

	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
	};

	render() {
		const { classes, theme } = this.props;

		return (
			<Consumer>
				{(value) => {
					const { handleChange, searchTitle, filterSearch } = value;
					return (
						<div className={classes.root}>
							<AppBar position="fixed">
								<Toolbar>
									<div className={classes.grow} />
									<div className={classes.search}>
										<div className={classes.searchIcon}>
											<SearchIcon />
										</div>
										<InputBase
											placeholder="Search by Title…"
											name="searchTitle"
											value={searchTitle}
											onChange={handleChange}
											onKeyUp={filterSearch}
											classes={{
												root: classes.inputRoot,
												input: classes.inputInput
											}}
										/>
									</div>
								</Toolbar>
							</AppBar>

							<main className={classes.content}>
								<div className={classes.toolbar} />
							</main>
						</div>
					);
				}}
			</Consumer>
		);
	}
}

MiniDrawer.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);
