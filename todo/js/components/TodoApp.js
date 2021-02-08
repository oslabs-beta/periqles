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
import AddTodoMutation from '../mutations/AddTodoMutation';
import TodoList from './TodoList';
import TodoListFooter from './TodoListFooter';
import TodoTextInput from './TodoTextInput';

import React from 'react';
import {createFragmentContainer, commitMutation, graphql} from 'react-relay';
// import {PeriqlesForm} from '../../../index.js';
// import PeriqlesForm from './PeriqlesForm.js';
import periqlesFormWrapper from './PeriqlesForm.js';
import schema from './schema.js';
import type {RelayProp} from 'react-relay';
import type {TodoApp_user} from 'relay/TodoApp_user.graphql';

type Props = {|
  +relay: RelayProp,
  +user: TodoApp_user,
|};

const TodoApp = ({relay, user}: Props) => {
  const handleTextInputSave = (text: string) => {
    AddTodoMutation.commit(relay.environment, text, user);
    return;
  };

  const hasTodos = user.totalCount > 0;

  // mock props for PeriqlesForm
  const mutation = 'AddTodo';
  const specifications = {
    fields: {
        name: {
            label: "Name",
            element: "text",
        },
        gender: {
            label: "Gender",
            element: "radio",
            options: [
              {label: "male", value: "m"},
              {label:"female", value: "f"},
              {label: "non-binary", value: "x"},
            ],
        }
    },
  };

  const mutationGQL = graphql`
  mutation AddTodoMutation($input: AddTodoInput!) {
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
  }`;

  const input = {
    text: 'Race Usain Bolt',
    clientMutationId:'0000',
    userId: 'me',
  };
  const variables = {
    input,
  };

  // commitMutation(relay.environment, {
  //   mutationGQL,
  //   variables,
  //   onCompleted: (response, errors) => console.log('Server response to mutation:', response, errors),
  //   onError: (err) => console.error('Problem committing mutation:', err),
  // });   

  // mock making closure
  // console.log('Relay environment:', relay.environment);
  // console.log('Relay schema:', schema);
  // const environment = {networkLayer: 'fake network layer', store: 'fake Relay store'};
  const PeriqlesForm = periqlesFormWrapper(schema, relay.environment);

  return (
    <div>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <TodoTextInput
            className="new-todo"
            onSave={handleTextInputSave}
            placeholder="What needs to be done?"
          />
        </header>

        <TodoList user={user} />
        {hasTodos && <TodoListFooter user={user} />}
      </section>
      <PeriqlesForm mutationName={mutation} mutationGQL={mutationGQL} specifications={specifications} args={[{name: 'clientMutationId', value:'0000'}, {name: 'userId', value: 'me'}]} />
      <footer className="info">
        <p>Double-click to edit a todo</p>

        <p>
          Created by the{' '}
          <a href="https://facebook.github.io/relay/">Relay team</a>
        </p>

        <p>
          Part of <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>
    </div>
  );
};

export default createFragmentContainer(TodoApp, {
  user: graphql`
    fragment TodoApp_user on User {
      id
      userId
      totalCount
      ...TodoListFooter_user
      ...TodoList_user
    }
  `,
});
