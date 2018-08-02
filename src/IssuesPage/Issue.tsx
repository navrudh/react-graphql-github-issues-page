import * as React from 'react';
import styled from 'styled-components';
import { IssueNode } from './IssuesList';

const Title = styled.h1.attrs({
  className: 'georgia f4 fw4 mt0 mb0 black-60'
})``;

const Wrapper = styled.article.attrs({className: 'mw7 center bg-washed-blue br3 pa3 pa4-ns mv3 ba b--black-10'})``;

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
          <div key={node.name}>
            <p>{`${node.name}: ${node.color}`}</p>
          </div>
        ))}
      </Wrapper>
    );
  }
}

export default Issue;
