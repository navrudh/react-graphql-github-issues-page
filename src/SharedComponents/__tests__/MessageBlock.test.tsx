import * as React from 'react';

import MessageBlock from '../MessageBlock';
import { shallow } from 'enzyme';

describe('MessageBlock', () => {
  it('with warning message renders correctly', () => {
    const wrapper = shallow(<MessageBlock msgType={'warning'} content={'Warning Text'} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('with error message renders correctly', () => {
    const wrapper = shallow(<MessageBlock msgType={'error'} content={'Error Text'} />);
    expect(wrapper).toMatchSnapshot();
  });
});
