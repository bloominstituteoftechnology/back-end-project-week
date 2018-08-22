/// <reference types="react" />
import * as React from 'react';
import { DndComponentClass } from './interfaces';
export interface DecorateHandlerArgs<P, ComponentClass extends React.ComponentClass<P>> {
    DecoratedComponent: ComponentClass;
    createHandler: any;
    createMonitor: any;
    createConnector: any;
    registerHandler: any;
    containerDisplayName: string;
    getType: any;
    collect: any;
    options: any;
}
export default function decorateHandler<P, S, TargetComponent extends React.Component<P, S> | React.StatelessComponent<P>, TargetClass extends React.ComponentClass<P>>({DecoratedComponent, createHandler, createMonitor, createConnector, registerHandler, containerDisplayName, getType, collect, options}: DecorateHandlerArgs<P, TargetClass>): TargetClass & DndComponentClass<P, S, TargetComponent, TargetClass>;
