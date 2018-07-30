import * as React from 'react';

import { IssueNode } from './IssuesList';

class Issue extends React.Component<IssueNode> {
  private issue: IssueNode;

  constructor(prop: IssueNode) {
    super(prop);
    this.issue = prop;
  }

  public render() {
    return (
      <div>
        <p> {this.issue.title} </p>
        {this.issue.labels.edges.map(({ node }) => (
          <div key={node.name}>
            <p>{`${node.name}: ${node.color}`}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Issue;
