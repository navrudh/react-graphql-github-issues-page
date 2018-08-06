import * as React from 'react';

import Issue from '../Issue';
import { IssueNode } from '../IssuesList';
import { shallow } from 'enzyme';

const node: IssueNode = {
  id: '1',
  labels: { edges: Array(5).fill({ node: { name: 'fix', color: '000000' } }) },
  title: 'Issue title',
  url: 'link'
};

describe('Issue', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Issue {...node} />);
    expect(wrapper).toMatchSnapshot();
  });
});
