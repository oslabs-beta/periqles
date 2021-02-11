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

// import 'todomvc-common';   // injects an <aside> element that prints the contents of learn.json

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
import UserProfile from './components/UserProfile';
import type {appQueryResponse} from 'relay/appQuery.graphql';
import {isPropertySignature} from 'typescript';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.render(
    <React.StrictMode>
      <UserProfile />
    </React.StrictMode>,
    rootElement
  )
}


// async function fetchQuery(
//   operation: RequestNode,
//   variables: Variables,
// ): Promise<{}> {
//   const response = await fetch('/graphql', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       query: operation.text,
//       variables,
//     }),
//   });

//   return response.json();
// }

// const modernEnvironment: Environment = new Environment({
//   network: Network.create(fetchQuery),
//   store: new Store(new RecordSource()),
// });

// seed QueryRenderer with a DemoUser to start with
// AddUserMutation.commit(
//   modernEnvironment,
//   'UN1',
//   'PW1',
//   'E1',
//   'NON_BINARY',
//   'HAWAIIAN',
//   1,
// );

// if (rootElement) {
//   ReactDOM.render(
//     <QueryRenderer 
//       environment={modernEnvironment}
//       query={''}
//       render={({error, props}: {error: ?Error, props: ?UserProfileQueryResponse}) => {
//         console.log('these are the props from App', props);
//         if (props) {
//           return (
//            <UserProfile />
//           );
//         } else if (error) {
//           return <p>{error.message}</p>;
//         }

//         <p>Loading...</p>
//       }}
//     />
//     , rootElement);
// }
