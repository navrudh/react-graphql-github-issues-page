import * as React from 'react';

import MessageBlock from './MessageBlock';
import { storiesOf } from '@storybook/react';

const stories = storiesOf('Components/MessageBlock', module);

stories.add('warning', () => (
  <MessageBlock msgType={'warning'} content={'Warning Text'} />
));
stories.add('error', () => (
  <MessageBlock msgType={'error'} content={'Error Text'} />
));
