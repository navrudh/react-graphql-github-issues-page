import * as Color from 'color';
import * as React from 'react';

import { IssueNode } from './IssuesList';
import styled from 'styled-components';

const Title = styled.h1.attrs({
  className: 'georgia f4 fw4 mt0 mb3 black-60'
})``;

const Wrapper = styled.article.attrs({
  className: 'w-80 w-ns-100 center bg-washed-blue br3 pa3 pa4-ns mv3 ba b--black-10'
})``;

const Badge = styled.article.attrs({ className: 'f6 link dim br3 ph3 pv2 ma2 dib' })`
  background-color: ${props => props.color}
  color: ${props => (Color(props.color).isDark() ? '#FFFFFF' : '#000000')}
`;

class Issue extends React.Component<IssueNode> {
  private issue: IssueNode;

  constructor(prop: IssueNode) {
    super(prop);
    this.issue = prop;
  }

  public render() {
    return (
      <Wrapper>
        <Title> {this.issue.title} </Title>
        {this.issue.labels.edges.map(({ node }) => (
          <Badge key={node.name} color={'#' + node.color}>
            {`${node.name}: ${node.color}`}
          </Badge>
        ))}
      </Wrapper>
    );
  }
}

export default Issue;
