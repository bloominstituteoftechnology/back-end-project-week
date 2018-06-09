import React, { Component } from 'react';
import injectSheet from 'react-jss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router-dom';

class WheelIcon extends Component {
    state = {
        hover: false
    }
    handleMouseEnter = () => {
        this.setState({ hover: true })
    }
    handleMouseLeave = () => {
        this.setState({ hover: false })
    }
    handleClick = () => {
        this.props.history.push(`/${this.props.name}`)
    }
    render() {
        const { classes, children, name } = this.props
        const iconClassName = this.state.hover ? [classes.secondaryButton, classes.wheelDistance, classes.hover].join(' ') : [classes.secondaryButton, classes.wheelDistance].join(' ')
        const tooltipClassName = this.state.hover ? [classes.tooltip, classes.tooltipDistance, classes.fadeIn].join(' ') : [classes.tooltip, classes.tooltipDistance, classes.fadeOut].join(' ')
        return (
            <div
                className={iconClassName}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                onClick={this.handleClick}
            >
                <div>
                    {children}
                </div>
                <div className={tooltipClassName}>
                    {name}
                </div>
            </div>
        )
    }
}


const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    secondaryButton: theme.button.secondary,
    wheelDistance: {
        position: 'absolute',
        transform: props => `rotate(${props.index * props.distance_between_icons}deg) translateX(55px) rotate(${props.index * props.rotateDeg}deg)`,
    },
    hover: {
        transform: props => `rotate(${props.index * props.distance_between_icons}deg) translateX(60px) rotate(${props.index * props.rotateDeg}deg)`,
        transition: 'transform 0.3s ease'
    },
    tooltip: theme.tooltip,
    tooltipDistance: {
        position: 'absolute',
        transform: props => `rotate(${props.index * props.distance_between_icons}deg) translateX(40px) rotate(${props.index * props.rotateDeg}deg)`,
    },
    fadeIn: {
        opacity: 1,
        transition: 'opacity 0.5s ease'
    },
    fadeOut: {
        opacity: 0,
        transition: 'opacity 0.5s ease'
    },
})

export default withRouter(injectSheet(styles)(WheelIcon));