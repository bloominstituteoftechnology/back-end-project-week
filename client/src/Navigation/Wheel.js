import React, { Component } from 'react';
import injectSheet from 'react-jss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import WheelIcon from './WheelIcon';
import { Container, Draggable } from 'react-smooth-dnd';
import posed from 'react-pose';

const iconList = [
  { name: 'settings', icon: 'cog' },
  { name: 'account', icon: 'user' },
  { name: 'export', icon: 'file-excel' },
  { name: 'sort', icon: 'sort-alpha-down' },
  { name: 'lists', icon: 'clipboard-list' },
  { name: 'tags', icon: 'tags' },
  { name: 'notes', icon: 'sticky-note' }]

const PosedTrashDropArea = posed.div({
  visible: {
    opacity: 1,
    scale: 1.3
  },
  hidden: {
    opacity: 0,
    scale: 1
  }
})

class Wheel extends Component {
  state = {
    isDraggingToTrash: false
  }
  handleDrop = (e) => {
    console.log(e)
    this.setState({ isDraggingToTrash: false })
  }
  handleDragInsideTrash = (e) => {
    this.setState({ isDraggingToTrash: true })
  }
  handleDragOutsideTrash = (e) => {
    this.setState({ isDraggingToTrash: false })
  }
  render() {
    const { classes } = this.props
    const distance_between_icons = -180 / (iconList.length - 1)
    const rotateDeg = 0 - distance_between_icons
    let dragToDeleteClass = this.state.isDraggingToTrash ? classes.draggingToTrashStyle : ''
    return (
      <div className={classes.root}>
        <PosedTrashDropArea
          className={classes.trashDropAreaIndicator}
          pose={this.state.isDraggingToTrash ? 'visible' : 'hidden'}
        >
        </PosedTrashDropArea>
        <div className={classes.trashIcon}>
          <FontAwesomeIcon icon='trash-alt' />
        </div>
        <div className={classes.rightCorner}>
          <Container
            groupName='unpinnedNotes'
            orientation='horizontal'
            onDragEnter={() => this.handleDragInsideTrash()}
            onDragLeave={() => this.handleDragOutsideTrash()}
            onDrop={(e) => this.handleDrop(e)}>
            <div className={classes.trashDropArea}></div>
          </Container>
        </div>

        <div className={[classes.primaryButton, classes.highlightButton].join(' ')} onClick={this.props.handleCreateNote}>
          <FontAwesomeIcon icon='plus' />
        </div>
        {iconList.map((iconSet, index) =>
          <WheelIcon
            key={iconSet.name}
            index={index}
            distance_between_icons={distance_between_icons}
            rotateDeg={rotateDeg}
            name={iconSet.name}
            openSideBar={this.props.openSideBar}
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
    width: '100%',
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButton: theme.button.primary,
  rightCorner: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 120,
    height: 120
  },
  trashDropArea: {
    width: 120,
    height: 120
  },
  trashDropAreaIndicator: {
    position: 'absolute',
    width: 300,
    height: 300,
    bottom: -120,
    right: -120,
    borderRadius: '50%',
    backgroundColor: theme.palette.orange.main
  },
  trashIcon: {
    ...theme.button.secondary,
    position: 'absolute',
    bottom: 10,
    right: 10,
  }
})

export default injectSheet(styles)(Wheel);