import React from 'react';
import { shallow } from 'enzyme';

import CreateNew from './CreateNew.js';

describe('<CreateNew />', () => {
    it ('should render without crashing', () => {
        shallow (<CreateNew />)
    })

    it('state should be empty default', () => {
        const wrapper = shallow(<CreateNew />);
        const instance = wrapper.instance();
      
        expect(instance.state.title).toBe('')
        expect(instance.state.content).toBe('')
    })

     it('should have 2 input elements', () => {
        const wrapper = shallow(<CreateNew/>);
        const display = wrapper.find('input');
      
        expect(display.length).toBe(2)
    }) 
})