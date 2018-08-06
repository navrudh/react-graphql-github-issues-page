import * as React from 'react';

import Issue from './Issue';
import { IssueNode } from './IssuesList';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

const Wrapper = styled.div.attrs({ className: 'w-80 outline center' })``;

const OutlineDecorator = (storyFn: Function) => <Wrapper>{storyFn()}</Wrapper>;

const noBadge: IssueNode = {
  id: '1',
  labels: { edges: [] },
  title: 'Issue title',
  url: 'link'
};

const oneBadge: IssueNode = {
  id: '1',
  labels: { edges: [{ node: { name: 'fix', color: '000000' } }] },
  title: 'Issue title',
  url: 'link'
};

const fiveBadges: IssueNode = {
  id: '1',
  labels: { edges: Array(5).fill({ node: { name: 'fix', color: '000000' } }) },
  title: 'Issue title',
  url: 'link'
};

const longTitle: IssueNode = {
  id: '1',
  labels: { edges: [] },
  title: 'A very very long title is sometimes used when there is need to be extra descriptive',
  url: 'link'
};

const stories = storiesOf('Components/Issue', module).addDecorator(OutlineDecorator);

stories.add('no badges', () => <Issue {...noBadge} />);
stories.add('one badge', () => <Issue {...oneBadge} />);
stories.add('five badges', () => <Issue {...fiveBadges} />);
stories.add('lomg title', () => <Issue {...longTitle} />);
