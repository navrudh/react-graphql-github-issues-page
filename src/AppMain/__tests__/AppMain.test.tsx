import * as React from 'react';

import AppMain from '../AppMain';
import { shallow } from 'enzyme';

describe('AppMain', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<AppMain />);
    expect(wrapper).toMatchSnapshot();
  });
});
