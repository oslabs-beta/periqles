// @flow
/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only.  Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import 'todomvc-common';
// import periqles, {PeriqlesForm} from '../../index.js';

import * as React from 'react';
import ReactDOM from 'react-dom';

import {QueryRenderer, graphql} from 'react-relay';
import {
  Environment,
  Network,
  RecordSource,
  Store,
  type RequestNode,
  type Variables,
} from 'relay-runtime';
import AddUserMutation from './mutations/AddUserMutation';
import TodoApp from './components/TodoApp';
import UserProfile from './components/UserProfile';
import type {appQueryResponse} from 'relay/appQuery.graphql';
import {isPropertySignature} from 'typescript';

async function fetchQuery(
  operation: RequestNode,
  variables: Variables,
): Promise<{}> {
  const response = await fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  });

  return response.json();
}

const modernEnvironment: Environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

// allow periqles to introspect schema
// periqles.introspect(modernEnvironment);

// mock props for PeriqlesForm
const mutation = '';
const specifications = {
  fields: [
    {
      name: 'name',
      element: 'text',
      id: 'textId',
    },
    {
      name: 'gender',
      element: 'radio',
      options: [
        {name: 'male', value: 'm'},
        {name: 'female', value: 'f'},
        {name: 'prefer not to say', value: 'x'},
      ],
      id: 'radioId',
    },
  ],
  args: [{name: 'userID', value: 'me'}],
};
console.log(
  'returned from commit',
  AddUserMutation.commit(
    modernEnvironment,
    'UN1',
    'PW1',
    'E1',
    'NON_BINARY',
    'HAWAIIAN',
    1,
  ),
);
const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.render(
    <QueryRenderer
      environment={modernEnvironment}
      // add demoUser to query and share with AddUser_demoUser?
      // user(id: $userId) {
      //   ...TodoApp_user
      // }
      query={graphql`
        query appQuery($demoUserId: String) {
          demoUser(demoUserId: $demoUserId) {
            ...UserProfile_demoUser
          }
        }
      `}
      variables={{
        // Mock authenticated ID that matches database
        userId: 'me',
        demoUserId: '0',
      }}
      render={({error, props}: {error: ?Error, props: ?appQueryResponse}) => {
        console.log('these are the props from App', props);
        if (props && props.demoUser) {
          return (
            <div>
              <UserProfile
                demoUser={props.demoUser}
                environment={props.modernEnvironment}
              />
              {/* <PeriqlesForm mutation={mutation} specifications={specifications}/> */}
            </div>
          );
        } else if (error) {
          return <div>{error.message}</div>;
        }

        return <div>Loading</div>;
      }}
    />,
    rootElement,
  );
}
