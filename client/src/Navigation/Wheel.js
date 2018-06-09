import React, { Component } from 'react';
import injectSheet from 'react-jss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import WheelIcon from './WheelIcon';

const iconList = [
  { name: 'settings', icon: 'cog' },
  { name: 'account', icon: 'user' },
  { name: 'lists', icon: 'clipboard-list' },
  { name: 'tags', icon: 'tags' },
  { name: 'notes', icon: 'sticky-note' }]

class Wheel extends Component {
  render() {
    const { classes } = this.props
    const distance_between_icons = -180 / (iconList.length - 1)
    const rotateDeg = 0 - distance_between_icons
    return (
      <div className={classes.root}>
        <div className={[classes.primaryButton, classes.highlightButton].join(' ')}>
          <FontAwesomeIcon icon='plus' />
        </div>
        {iconList.map((iconSet, index) =>
          <WheelIcon
            key={iconSet.name}
            index={index}
            distance_between_icons={distance_between_icons}
            rotateDeg={rotateDeg}
            name={iconSet.name}
          >
            <FontAwesomeIcon icon={iconSet.icon} />
          </WheelIcon>
        )}
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButton: theme.button.primary,
})

export default injectSheet(styles)(Wheel);