import * as React from 'react';
import * as renderer from 'react-test-renderer';

import Pagination, { PaginationProps } from '../Pagination';
import { mount, shallow } from 'enzyme';

const paginationProps: PaginationProps = {
  onPageChanged: () => {
    return;
  },
  pageLimit: 10,
  pageNeighbours: 3,
  totalRecords: 100
};

describe('Pagination', () => {
  const _component = shallow(<Pagination {...paginationProps} />);

  it('renders and matches our snapshot', () => {
    const component = renderer.create(<Pagination {...paginationProps} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot renders correctly', () => {
    expect(_component).toMatchSnapshot();
  });

  it('creates pagination buttons', () => {
    expect(_component.find('a')).toHaveLength(9);
  });

  it('displays "Next" button', () => {
    expect(
      _component
        .find('a')
        .map(elem => elem.props()['aria-label'] === 'Next')
        .filter(bool => bool)
    ).toHaveLength(1);
  });

  it('hides "Previous" button', () => {
    expect(
      _component
        .find('a')
        .map(elem => elem.props()['aria-label'] === 'Previous')
        .filter(bool => bool)
    ).toHaveLength(0);
  });

  it('shows "Previous" button', () => {
    _component.find('a').map(
      elem =>
        elem.props()['aria-label'] === 'Next' &&
        elem.simulate('click', {
          // tslint:disable-next-line:no-empty
          preventDefault: () => {}
        })
    );

    expect(
      _component
        .find('a')
        .map(elem => elem.props()['aria-label'] === 'Previous')
        .filter(bool => bool)
    ).toHaveLength(1);
  });

  it('"Next" calls handleMoveRight', () => {
    const component = shallow(<Pagination {...paginationProps} />);

    const instance = component.instance();
    const spy = jest.spyOn(instance, 'handleMoveRight');

    component.find('a').map(
      elem =>
        elem.props()['aria-label'] === 'Next' &&
        elem.simulate('click', {
          // tslint:disable-next-line:no-empty
          preventDefault: () => {}
        })
    );

    component.find('a').map(
      elem =>
        elem.props()['aria-label'] === 'Previous' &&
        elem.simulate('click', {
          // tslint:disable-next-line:no-empty
          preventDefault: () => {}
        })
    );

    component.find('a').map(
      elem =>
        elem.props()['aria-label'] === 'Next' &&
        elem.simulate('click', {
          // tslint:disable-next-line:no-empty
          preventDefault: () => {}
        })
    );

    expect(spy).toHaveBeenCalled();
  });

  it('"Previous" calls handleMoveLeft', () => {
    const component = shallow(<Pagination {...paginationProps} />);

    const instance = component.instance();
    const spy = jest.spyOn(instance, 'handleMoveLeft');

    component.find('a').map(
      elem =>
        elem.props()['aria-label'] === 'Next' &&
        elem.simulate('click', {
          // tslint:disable-next-line:no-empty
          preventDefault: () => {}
        })
    );

    component.find('a').map(
      elem =>
        elem.props()['aria-label'] === 'Previous' &&
        elem.simulate('click', {
          // tslint:disable-next-line:no-empty
          preventDefault: () => {}
        })
    );

    expect(spy).toHaveBeenCalled();
  });
});
