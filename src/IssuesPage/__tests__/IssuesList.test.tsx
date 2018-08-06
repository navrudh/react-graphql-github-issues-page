import * as React from 'react';

import IssuesList from '../IssuesPage';
import { shallow } from 'enzyme';

describe('IssuesList', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<IssuesList />);
    expect(wrapper).toMatchSnapshot();
  });
});
