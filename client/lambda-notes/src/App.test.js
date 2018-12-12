import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import App from './App';

describe('<App />', () => {
    it('renders without crashing', () => {
        shallow(<App />);
    })

    it('notes state should be empty by default', () => {
        const wrapper = shallow(<App />);
        const instance = wrapper.instance();

        expect(instance.state.notes).toEqual([]);
    })
    it('should have one overall App div', () => {
        const wrapper = shallow(<App />);
        const display = wrapper.find('div.App');

        expect(display.length).toBe(1)
    })
})