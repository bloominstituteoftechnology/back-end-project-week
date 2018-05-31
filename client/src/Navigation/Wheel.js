import React, { Component } from 'react';
import WheelIcon from './WheelIcon';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const iconList = ['settings','account_circle','search','list','bookmarks','note']

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainButton: {
    backgroundColor: theme.palette.primary.main,
    margin: theme.spacing.unit,
  },
  subButton: {
    color: theme.palette.primary.light,
    position: 'absolute',
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.primary.main
    }
  },
});

class Wheel extends Component {
  getName = (icon) => {
    if (icon === 'account_circle') {
      return 'account'
    }
    return icon.replace('_',' ')
  }
  render() {
    const { classes } = this.props;
    const distanceBetweenIcons = -180/(iconList.length-1)
    const rotateDeg = 0-distanceBetweenIcons
    return (
      <div className={classes.root}>
        <Button variant="fab" color="secondary" aria-label="add" className={classes.mainButton}>
          <AddIcon />
        </Button>
        { iconList.map((icon,index) => 
            <div 
              key={icon} 
              className={classes.subButton} 
              style={{transform: `rotate(${index*distanceBetweenIcons}deg) translateX(60px) rotate(${index*rotateDeg}deg)`}}>
                <WheelIcon icon={icon} name={this.getName(icon)}/>
            </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Wheel);