import MarkAllTodosMutation from '../../data/mutations/MarkAllTodosMutation';
import Todo from './Todo';

import React from 'react';
import {createFragmentContainer, graphql} from 'react-relay';

const TodoList = ({
  relay,
  user,
  user: {todos, totalCount, completedCount},
}) => {
  const handleMarkAllChange = (e) => {
    const complete = e.currentTarget.checked;

    if (todos) {
      MarkAllTodosMutation.commit(relay.environment, complete, todos, user);
    }
  };

  const nodes =
    todos && todos.edges
      ? todos.edges
          .map((edge) => edge.node)
      : [];

  return (
    <section className="main">
      <input
        checked={totalCount === completedCount}
        className="toggle-all"
        onChange={handleMarkAllChange}
        type="checkbox"
      />

      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list">
        {nodes.map((node) => (
          <Todo key={node.id} todo={node} user={user} />
        ))}
      </ul>
    </section>
  );
};

export default createFragmentContainer(TodoList, {
  user: graphql`
    fragment TodoList_user on User {
      todos(
        first: 2147483647 # max GraphQLInt
      ) @connection(key: "TodoList_todos") {
        edges {
          node {
            id
            complete
            ...Todo_todo
          }
        }
      }
      id
      userId
      totalCount
      completedCount
      ...Todo_user
    }
  `,
});