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
// import periqles from '../module/index.js';

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

import TodoApp from './components/TodoApp';
// import PeriqlesForm from '../module/PeriqlesForm.jsx';
import PeriqlesForm from './components/PeriqlesForm.jsx';
import type {appQueryResponse} from 'relay/appQuery.graphql';

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


const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.render(
    <QueryRenderer
      environment={modernEnvironment}
      // add demoUser to query and share with AddUser_demoUser?
      query={graphql`
        # query appQuery($userId: String, $demoUserId: String) {
        query appQuery($userId: String) {
          user(id: $userId) {
            ...TodoApp_user
          }
          # demoUser(id: $demoUserId) {
          #   ...AddUser_demoUser
          # }
        }
      `}
      variables={{
        // Mock authenticated ID that matches database
        userId: 'me',
        // demoUserId: pieceofstate,
      }}
      render={({error, props}: {error: ?Error, props: ?appQueryResponse}) => {
        if (props && props.user) {
          return (
            <div>
              <TodoApp user={props.user} />
              <PeriqlesForm
                mutationName={'AddTodo'}
                mutationGQL={graphql`
                  mutation app_AddTodoMutation($input: AddTodoInput!) {
                    addTodo(input: $input) {
                      todoEdge {
                        __typename
                        cursor
                        node {
                          complete
                          id
                          text
                        }
                      }
                      user {
                        id
                        totalCount
                      }
                    }
                  }
                `}
              />
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


// allow periqles to introspect schema
// periqles.introspect(modernEnvironment);

/*
const fieldsArrayGenerator = (inputType, args = []) => {
  const fieldsArray = [];
  // exclude from the form any inputs accounted for by args
  const exclude = args.map((arg) => arg.name);

  inputType.inputFields.forEach((field) => {
    if (exclude.includes(field.name)) return;

    const fieldObj = {
      name: field.name,
    };

    // the input field is a scalar, nullable type
    if (field.type.name && field.type.kind === 'SCALAR') {
      fieldObj.type = field.type.name;
    }
    // the input field is an enumerated type
    else if (field.type.kind === 'ENUM') {
      fieldObj.type = 'Enum';
      fieldObj.options = {};

      // TODO: Populate fieldObj.options. (Object or array?) Check out inputFields and other properties of __EnumValue type on schema.
    }
    // the input field is a scalar wrapped in a NON_NULL type
    else if (field.type.ofType.name && field.type.ofType.kind === 'SCALAR') {
      fieldObj.type = field.type.ofType.name;
    }
    // TODO: the input field is not a scalar or enum type
    else {
      console.warn(
        `The '${field.name}' input field is of a complex type not currently supported by PeriqlesForm. It will default to a 'String'. Type:`,
        field,
      );
      fieldObj.type = 'String';
    }

    fieldsArray.push(fieldObj);
  });

  return fieldsArray;
};

const args = [
  {name: 'clientMutationId', value: '0000'},
  {name: 'userId', value: 'me'},
];
*/

// const inputTypeName = 'AddTodoInput';

// fetch('/graphql', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     query: `query typeQuery($inputType: String!)
//     {
//         __type(name: $inputType) {
//             name
//             inputFields {
//               name
//               type {
//                 name
//                 kind
//                 ofType {
//                   name
//                   kind
//                 }
//               }
//             }
//           }
//         }`,
//     variables: {
//       inputType: inputTypeName,
//     },
//   }),
// })
//   .then(res => res.json())
//   .then(({data}) => {
//     console.log('AddTodoInput:', data);
//     // const fields = fieldsArrayGenerator(data.__type);
//     // console.log(fields);
// });