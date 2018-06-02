import React, { Component } from 'react';
import injectSheet from 'react-jss';

const styles = {
    root: props => ({
        background: `url(${props.randomBgUrl}) no-repeat center`,
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center'
    })
}

const BackgroundWrapper = ({ classes, randomBgUrl, children }) =>
    <div className={classes.root}>
        {children}
    </div>

export default injectSheet(styles)(BackgroundWrapper);