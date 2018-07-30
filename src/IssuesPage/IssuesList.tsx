import * as React from 'react';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Issue from './Issue';

interface QueryResult {
  repository: Repository;
}

interface Repository {
  issues: Issues;
}

interface Issues {
  totalCount: number;
  edges: IssueEdge[];
}

interface IssueEdge {
  node: IssueNode;
}

export interface IssueNode {
  id: string;
  title: string;
  url: string;
  labels: IssueLabel;
}

interface IssueLabel {
  edges: LabelEdges[];
}

interface LabelEdges {
  node: LabelNode;
}

interface LabelNode {
  name: string;
  color: string;
}

const query = (repoOwner: string, repoName: string, issuesFirst: number, issueStatus: 'OPEN' | 'CLOSED') => gql`
{
  repository(owner: ${repoOwner}, name: ${repoName}) {
    issues(first: ${issuesFirst}, states: ${issueStatus}) {
      totalCount
      edges {
        node {
          id
          title
          url
          labels(first: 5) {
            edges {
              node {
                name
                color
              }
            }
          }
        }
      }
    }
  }
}

`;

interface IssuesQueryProps {
  repoOwner: string;
  repoName: string;
  issuesFirst?: number;
  issueStatus?: 'OPEN' | 'CLOSED';
}

class IssuesList extends React.Component<IssuesQueryProps> {
  private repoOwner: string;
  private repoName: string;
  private issuesFirst: number;
  private issueStatus: 'OPEN' | 'CLOSED';

  constructor(props: IssuesQueryProps) {
    super(props);
    props = props;
    this.repoOwner = props.repoOwner;
    this.repoName = props.repoName;
    this.issuesFirst = props.issuesFirst || 20;
    this.issueStatus = props.issueStatus || 'OPEN';
  }

  public render() {
    return (
      <Query query={query(this.repoOwner, this.repoName, this.issuesFirst, this.issueStatus)}>
        {({ loading, error, data }) => {
          if (loading) {
            return <p>Loading...</p>;
          }
          if (error) {
            return <p>Error :(</p>;
          }

          const queryResult: QueryResult = data;
          return queryResult.repository.issues.edges.map(({ node }) => <Issue {...node} />);
        }}
      </Query>
    );
  }
}

export default IssuesList;
