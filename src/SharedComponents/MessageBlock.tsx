import * as React from 'react';

import styled, { StyledComponentClass } from 'styled-components';

const wrapperClasses = (msgType: 'warning' | 'error') => {

  if (msgType === 'warning') {
    return 'bg-light-yellow b--yellow';
  } else if (msgType === 'error') {
    return 'bg-washed-red b--red';
  }

  return 'bg-washed-blue b--black-10';
};

const Title = styled.h1.attrs({
  className: 'tc georgia f4 fw4 mt0 mb0 black-60'
})``;

const Wrapper = (msgType: 'warning' | 'error') =>
  styled.article.attrs({
    className:
      'w-80 w-ns-100 center br3 pa3 pa4-ns mv3 ba' +
      ` ${wrapperClasses(msgType)}`
  })``;

class MessageBlock extends React.Component<{
  content: string;
  msgType: 'warning' | 'error';
}> {
  private content: string;
  // tslint:disable-next-line:no-any
  private _Wrapper: StyledComponentClass<any, any, any>;

  constructor(prop: { content: string; msgType: 'warning' | 'error' }) {
    super(prop);
    this.content = prop.content;
    this._Wrapper = Wrapper(prop.msgType);
  }

  public render() {
    return (
      <this._Wrapper>
        <Title> {this.content} </Title>
      </this._Wrapper>
    );
  }
}

export default MessageBlock;
