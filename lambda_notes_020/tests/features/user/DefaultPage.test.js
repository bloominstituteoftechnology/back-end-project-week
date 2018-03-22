import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { DefaultPage } from 'src/features/user/DefaultPage';

describe('user/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      user: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.user-default-page').getElement()
    ).to.exist;
  });
});
