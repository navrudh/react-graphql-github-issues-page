import * as React from 'react';

import IssuesList from './IssuesList';

class IssuesPage extends React.Component {

  public render() {
    return (
      <div>
        <IssuesList repoOwner="angular" repoName="angular"/>
      </div>
    );
  }
}

export default IssuesPage;
