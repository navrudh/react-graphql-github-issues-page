import * as React from 'react';

import Pagination, { PaginationProps } from './Pagination';

import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

const Wrapper = styled.div.attrs({ className: 'w-80 outline center' })``;

const OutlineDecorator = (storyFn: Function) => <Wrapper>{storyFn()}</Wrapper>;

const stories = storiesOf('Components/Pagination', module).addDecorator(OutlineDecorator);

const paginationProps: PaginationProps = {
  onPageChanged: () => {
    return;
  },
  pageLimit: 10,
  pageNeighbours: 3,
  totalRecords: 100
};

stories.add('default', () => <Pagination {...paginationProps} />);
