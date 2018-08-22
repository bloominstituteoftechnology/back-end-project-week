import { DragDropManager, XYCoord } from 'dnd-core';
import { DropTargetMonitor } from './interfaces';
export declare class TargetMonitor implements DropTargetMonitor {
    private internalMonitor;
    private targetId;
    constructor(manager: DragDropManager<any>);
    receiveHandlerId(targetId: string): void;
    canDrop(): boolean;
    isOver(options: {
        shallow?: boolean;
    }): boolean;
    getItemType(): string | symbol | null;
    getItem(): any;
    getDropResult(): any;
    didDrop(): boolean;
    getInitialClientOffset(): XYCoord | null;
    getInitialSourceClientOffset(): XYCoord | null;
    getSourceClientOffset(): XYCoord | null;
    getClientOffset(): XYCoord | null;
    getDifferenceFromInitialOffset(): XYCoord | null;
}
export default function createTargetMonitor<Context>(manager: DragDropManager<Context>): DropTargetMonitor;
