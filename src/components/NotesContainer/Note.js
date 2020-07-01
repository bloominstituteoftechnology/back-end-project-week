import React, { Component } from "react";
import { Link } from "react-router-dom";
import { findDOMNode } from "react-dom";
import {
	DropTarget,
	DragSource,
	ConnectDropTarget,
	ConnectDragSource,
	DropTargetMonitor,
	DropTargetConnector,
	DragSourceConnector,
	DragSourceMonitor
} from "react-dnd";
import { XYCoord } from "dnd-core";
import flow from "lodash.flow";

const noteSource = {
	beginDrag(props) {
		return {
			id: props.id,
			index: props.index,
			title: props.title,
			body: props.body,
			date: props.date
		};
	}
};

const noteTarget = {
	hover(props, monitor, component) {
		const dragIndex = monitor.getItem().index;

		const hoverIndex = props.index;

		if (dragIndex === hoverIndex) {
			return;
		}

		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

		const clientOffset = monitor.getClientOffset();

		const hoverClientY = clientOffset.y - hoverBoundingRect.top;

		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return;
		}
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return;
		}

		props.moveCard(dragIndex, hoverIndex);
		monitor.getItem().index = hoverIndex;
	}
};

class Note extends Component {
	render() {
		const {
			title,
			body,
			date,
			isDragging,
			connectDragSource,
			connectDropTarget
		} = this.props;
		const opacity = isDragging ? 0 : 1;

		return (
			connectDragSource &&
			connectDropTarget &&
			connectDragSource(
				connectDropTarget(
					<div className="note-link notes" style={{ opacity }}>
						<Link className="link" to={`/note/${this.props.id}`}>
							<div className="title">
								<h2>{title}</h2>
							</div>
							<hr className="divider" />
							<div className="body">
								<p className="text-body">{body}</p>
							</div>
						</Link>
						<div className="date">Created at: {date}</div>
					</div>
				)
			)
		);
	}
}

export default flow(
	DragSource("note", noteSource, (connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	})),
	DropTarget("note", noteTarget, connect => ({
		connectDropTarget: connect.dropTarget()
	}))
)(Note);
