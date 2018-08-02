import * as React from 'react';

import Issue from './Issue';
import { IssueNode } from './IssuesList';
import centered from '@storybook/addon-centered';
import { storiesOf } from '@storybook/react';

const props: IssueNode = {
  id: '1',
  labels: { edges: [{ node: { name: 'fix', color: 'EFEFEF' } }] },
  title: 'Same issue description for storybook',
  url: 'link'
};

const stories = storiesOf('Components/Issue', module).addDecorator(centered);

stories.add('default', () => <Issue {...props} />);
