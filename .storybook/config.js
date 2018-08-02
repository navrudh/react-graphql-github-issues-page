import '../node_modules/tachyons/css/tachyons.min.css'

import { configure } from '@storybook/react';

// automatically import all files ending in *.stories.tsx
const req = require.context('../src', true, /\.stories\.tsx$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
