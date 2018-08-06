import * as React from 'react';

import Pagination, { PaginationProps } from '../Pagination';

import { shallow } from 'enzyme';

const paginationProps: PaginationProps = {
  onPageChanged: () => {
    return;
  },
  pageLimit: 10,
  pageNeighbours: 3,
  totalRecords: 100
};

describe('Pagination', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Pagination {...paginationProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
