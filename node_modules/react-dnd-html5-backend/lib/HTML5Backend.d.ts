import { Backend, DragDropManager } from 'dnd-core';
declare global  {
    interface Window {
        __isReactDndBackendSetUp: boolean | undefined;
    }
}
export default class HTML5Backend implements Backend {
    private actions;
    private monitor;
    private registry;
    private context;
    private sourcePreviewNodes;
    private sourcePreviewNodeOptions;
    private sourceNodes;
    private sourceNodeOptions;
    private enterLeaveCounter;
    private dragStartSourceIds;
    private dropTargetIds;
    private dragEnterTargetIds;
    private currentNativeSource;
    private currentNativeHandle;
    private currentDragSourceNode;
    private currentDragSourceNodeOffset;
    private currentDragSourceNodeOffsetChanged;
    private altKeyPressed;
    private mouseMoveTimeoutTimer;
    private asyncEndDragFrameId;
    private dragOverTargetIds;
    private mouseMoveTimeoutId;
    constructor(manager: DragDropManager<any>);
    readonly window: Window | undefined;
    setup(): void;
    teardown(): void;
    connectDragPreview(sourceId: string, node: any, options: any): () => void;
    connectDragSource(sourceId: string, node: any, options: any): () => void;
    connectDropTarget(targetId: string, node: any): () => void;
    private addEventListeners(target);
    private removeEventListeners(target);
    private getCurrentSourceNodeOptions();
    private getCurrentDropEffect();
    private getCurrentSourcePreviewNodeOptions();
    private getSourceClientOffset(sourceId);
    private isDraggingNativeItem();
    private beginDragNativeItem(type);
    private asyncEndDragNativeItem();
    private endDragNativeItem();
    private isNodeInDocument(node);
    private endDragIfSourceWasRemovedFromDOM();
    private setCurrentDragSourceNode(node);
    private clearCurrentDragSourceNode();
    private checkIfCurrentDragSourceRectChanged();
    private handleTopDragStartCapture();
    private handleDragStart(e, sourceId);
    private handleTopDragStart(e);
    private handleTopDragEndCapture();
    private handleTopDragEnterCapture(e);
    private handleDragEnter(e, targetId);
    private handleTopDragEnter(e);
    private handleTopDragOverCapture();
    private handleDragOver(e, targetId);
    private handleTopDragOver(e);
    private handleTopDragLeaveCapture(e);
    private handleTopDropCapture(e);
    private handleDrop(e, targetId);
    private handleTopDrop(e);
    private handleSelectStart(e);
}
