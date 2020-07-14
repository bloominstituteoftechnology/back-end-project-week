/// <reference types="react" />
import React from 'react';
import PropTypes from 'prop-types';
import { DragDropManager, BackendFactory } from 'dnd-core';
import { ContextComponent } from './interfaces';
export declare const CHILD_CONTEXT_TYPES: {
    dragDropManager: PropTypes.Validator<any>;
};
export declare function createChildContext<Context>(backend: BackendFactory, context?: Context): {
    dragDropManager: DragDropManager<Context | undefined>;
};
export default function DragDropContext<P, S, TargetComponent extends React.Component<P, S> | React.StatelessComponent<P>>(backendFactory: BackendFactory, context?: any): <TargetClass extends React.ComponentClass<P>>(DecoratedComponent: TargetClass) => TargetClass & ContextComponent<P, S, TargetComponent>;
