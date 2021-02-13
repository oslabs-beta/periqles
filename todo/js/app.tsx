import * as React from 'react';
import ReactDOM from 'react-dom';

import {QueryRenderer, graphql} from 'react-relay';
import {Environment, Network, RecordSource, Store} from 'relay-runtime';
import type {RequestNode, Variables} from 'relay-runtime';
import AddUserMutation from './mutations/AddUserMutation';
import UserProfile from './components/UserProfile';
import type {appQueryResponse} from 'relay/appQuery.graphql';
import {isPropertySignature} from 'typescript';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.render(
    <React.StrictMode>
      <UserProfile />
    </React.StrictMode>,
    rootElement,
  );
}
