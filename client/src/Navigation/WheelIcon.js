import React, { Component } from 'react';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
  icon: {
    margin: theme.spacing.unit * 2,
  },
})

const WheelIcon = ({ classes, icon, name }) => {
  return (
    <Tooltip id="tooltip-top" title={name} placement="top">
      <Icon className={classes.icon} style={{ fontSize: 25 }}>
        {icon}
      </Icon>
    </Tooltip>
  )
}

export default withStyles(styles)(WheelIcon);
