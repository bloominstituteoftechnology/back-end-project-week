import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
// icons
import Note from '@material-ui/icons/Note';
import Label from '@material-ui/icons/Label';
// import Favorite from '@material-ui/icons/Favorite';
import Reminder from '@material-ui/icons/Notifications';
import Archive from '@material-ui/icons/Archive';
import Trash from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
// consumer
import { Consumer } from '../store/index';

const drawerWidth = 240;

const styles = (theme) => ({
	root: {
		display: 'flex'
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create([ 'width', 'margin' ], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create([ 'width', 'margin' ], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	menuButton: {
		marginLeft: 12,
		marginRight: 36
	},
	hide: {
		display: 'none'
	},
	drawerPaper: {
		position: 'relative',
		whiteSpace: 'nowrap',
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	drawerPaperClose: {
		overflowX: 'hidden',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		width: theme.spacing.unit * 7,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing.unit * 9
		}
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
		flexGrow: 1,
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
					const { handleChange, searchTitle } = value;
					const { open } = this.state;
					return (
						<div className={classes.root}>
							<CssBaseline />

							<AppBar
								position="fixed"
								className={classNames(classes.appBar, {
									[classes.appBarShift]: open
								})}
							>
								<Toolbar disableGutters={!open}>
									<IconButton
										color="inherit"
										aria-label="Open drawer"
										onClick={this.handleDrawerOpen}
										className={classNames(classes.menuButton, {
											[classes.hide]: open
										})}
									>
										<MenuIcon />
									</IconButton>
									<Typography variant="h6" color="inherit" noWrap>
										Note Keeper
									</Typography>
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
											classes={{
												root: classes.inputRoot,
												input: classes.inputInput
											}}
										/>
									</div>
								</Toolbar>
							</AppBar>
							<Drawer
								variant="permanent"
								classes={{
									paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose)
								}}
								open={open}
							>
								<div className={classes.toolbar}>
									<IconButton onClick={this.handleDrawerClose}>
										{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
									</IconButton>
								</div>
								<Divider />
								<List>
									{[ 'Notes', 'Reminders' ].map((text, index) => (
										<ListItem button key={text}>
											<ListItemIcon>{index % 2 === 0 ? <Note /> : <Reminder />}</ListItemIcon>
											<ListItemText primary={text} />
										</ListItem>
									))}
								</List>
								<Divider />
								<List>
									<label className={classes.label}>LABELS</label>
									{[ 'Edit labels' ].map((text, index) => (
										<ListItem button key={text}>
											<ListItemIcon>
												<Label />
											</ListItemIcon>
											<ListItemText primary={text} />
										</ListItem>
									))}
								</List>
								<Divider />
								<List>
									{[ 'Archive', 'Trash' ].map((text, index) => (
										<ListItem button key={text}>
											<ListItemIcon>{index % 2 === 0 ? <Archive /> : <Trash />}</ListItemIcon>
											<ListItemText primary={text} />
										</ListItem>
									))}
								</List>
							</Drawer>
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
