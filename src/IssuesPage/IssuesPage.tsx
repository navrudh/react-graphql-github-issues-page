import * as React from 'react';

import Pagination, { PaginationState } from '../SharedComponents/Pagination';

import IssuesList from './IssuesList';
import MessageBlock from '../SharedComponents/MessageBlock';
import { Query } from 'react-apollo';
import { client } from '../support';
import gql from 'graphql-tag';
import styled from 'styled-components';

interface QueryResult {
  repository: Repository;
}

interface Repository {
  issues: Issues;
}

interface Issues {
  totalCount: number;
  pageInfo: PageInfo;
}

interface PageInfo {
  startCursor: string;
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

const query = (
  repoOwner: string,
  repoName: string,
  issuesFirst: number,
  cursor: string | null = null,
  issueStatus: 'OPEN' | 'CLOSED' = 'OPEN'
) => gql`
{
  repository(owner: "${repoOwner}", name: "${repoName}") {
    issues(first: ${issuesFirst}, after: ${
  cursor ? '"' + cursor + '"' : null
} states: ${issueStatus}) {
      totalCount
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
}
`;

const queryLast = (
  repoOwner: string,
  repoName: string,
  issuesFirst: number,
  cursor: string | null = null,
  issueStatus: 'OPEN' | 'CLOSED' = 'OPEN'
) => gql`
{
  repository(owner: "${repoOwner}", name: "${repoName}") {
    issues(last: ${issuesFirst}, before: ${
  cursor ? '"' + cursor + '"' : null
} states: ${issueStatus}) {
      totalCount
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
}
`;

interface IssuesPageState {
  repoOwner: string;
  repoName: string;
  itemsPerPage: number;
  cursor: string | null;
  totalCount: number;
}

const Wrapper = styled.div.attrs({ className: 'w-80 w-ns-100 center' })``;

const PaginationContainer = styled.div.attrs({
  className: 'w-80 w-ns-100 center ma3'
})``;

class IssuesPage extends React.Component {
  public state: IssuesPageState = {
    cursor: null,
    itemsPerPage: 20,
    repoName: 'angular',
    repoOwner: 'angular',
    totalCount: 1
  };

  public paginationState: PaginationState;

  public setCursor(value: string | null) {
    this.setState({ cursor: value });
  }

  public pageInfoLast(p?: PageInfo) {
    p
      ? this.setState({ startCursor: p.startCursor, endCursor: p.endCursor })
      : this.setState({ startCursor: null, endCursor: null });
  }

  public onPageChanged = (state: PaginationState) => {
    let QUERY = null;

    if (state.currentPage === 1) {
      QUERY = query(
        this.state.repoOwner,
        this.state.repoName,
        this.state.itemsPerPage
      );
    } else if (state.currentPage === state.totalPages) {
      QUERY = queryLast(
        this.state.repoOwner,
        this.state.repoName,
        this.state.itemsPerPage + 1
      );
    } else if (state.currentPage > this.paginationState.currentPage) {
      QUERY = query(
        this.state.repoOwner,
        this.state.repoName,
        state.currentPage - this.paginationState.currentPage,
        this.state.cursor
      );
    } else {
      QUERY = queryLast(
        this.state.repoOwner,
        this.state.repoName,
        this.paginationState.currentPage - state.currentPage + 1,
        this.state.cursor
      );
    }

    client
      .query<QueryResult>({
        query: QUERY
      })
      .then(data => {
        const pageInfo = data.data.repository.issues.pageInfo;

        if (state.currentPage === 1) {
          this.setCursor(null);
        } else if (state.currentPage === state.totalPages) {
          this.setCursor(pageInfo.startCursor);
        } else if (state.currentPage > this.paginationState.currentPage) {
          this.setCursor(pageInfo.endCursor);
        } else {
          this.setCursor(pageInfo.startCursor);
        }

        this.paginationState = state;
      });
  }

  public render() {
    return (
      <Wrapper>
        <IssuesList {...this.state} firstCursor={this.state.cursor} />

        <Query
          query={query(
            this.state.repoOwner,
            this.state.repoName,
            this.state.itemsPerPage
          )}
        >
          {({ loading, error, data }) => {
            if (loading) {
              return (
                <MessageBlock msgType={'warning'} content={'Loading...'} />
              );
            }
            if (error) {
              return (
                <MessageBlock
                  msgType={'error'}
                  content={'Error in executing query :('}
                />
              );
            }

            const queryResult: QueryResult = data;
            this.state.totalCount = queryResult.repository.issues.totalCount;

            return (
              <PaginationContainer>
                <Pagination
                  totalRecords={this.state.totalCount}
                  pageNeighbours={4}
                  pageLimit={this.state.itemsPerPage}
                  onPageChanged={this.onPageChanged}
                />
              </PaginationContainer>
            );
          }}
        </Query>
      </Wrapper>
    );
  }
}

export default IssuesPage;
