/// <reference types="react" />
import { Component, ReactElement } from 'react';
import PropTypes from 'prop-types';
import { BackendFactory } from 'dnd-core';
/**
 * This class is a React-Component based version of the DragDropContext.
 * This is an alternative to decorating an application component with an ES7 decorator.
 */
export interface DragDropContextProviderProps<Context> {
    backend: BackendFactory;
    context?: Context;
}
export default class DragDropContextProviderImpl<Context> extends Component<DragDropContextProviderProps<Context>> {
    static propTypes: {
        backend: PropTypes.Validator<any>;
        children: PropTypes.Validator<any>;
        context: PropTypes.Requireable<any>;
    };
    static defaultProps: {
        context: undefined;
    };
    static childContextTypes: {
        dragDropManager: PropTypes.Validator<any>;
    };
    static displayName: string;
    private backend;
    private childContext;
    constructor(props: any, context: any);
    componentWillReceiveProps(nextProps: any): void;
    getChildContext(): any;
    render(): ReactElement<any>;
}
