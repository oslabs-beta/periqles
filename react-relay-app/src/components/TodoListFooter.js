import RemoveCompletedTodosMutation from '../../data/schema/mutations/RemoveCompletedTodosMutation';

import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';

const TodoListFooter = ({
  relay,
  user,
  user: {todos, completedCount, totalCount},
}) => {
  const completedEdges =
    todos && todos.edges
      ? todos.edges.filter(
          (edge) => edge && edge.node && edge.node.complete,
        )
      : [];

  const handleRemoveCompletedTodosClick = () => {
    RemoveCompletedTodosMutation.commit(
      relay.environment,
      { edges: completedEdges },
      user,
    );
  };

  const numRemainingTodos = totalCount - completedCount;

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{numRemainingTodos}</strong> item
        {numRemainingTodos === 1 ? '' : 's'} left
      </span>

      {completedCount > 0 && (
        <button
          className="clear-completed"
          onClick={handleRemoveCompletedTodosClick}>
          Clear completed
        </button>
      )}
    </footer>
  );
};

export default createFragmentContainer(TodoListFooter, {
  user: graphql`
    fragment TodoListFooter_user on User {
      id
      userId
      completedCount
      todos(
        first: 2147483647 # max GraphQLInt
      ) @connection(key: "TodoList_todos") {
        edges {
          node {
            id
            complete
          }
        }
      }
      totalCount
    }
  `,
});
