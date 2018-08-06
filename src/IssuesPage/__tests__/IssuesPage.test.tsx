import * as React from 'react';

import IssuesPage from '../IssuesPage';
import { shallow } from 'enzyme';

describe('IssuesPage', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<IssuesPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
