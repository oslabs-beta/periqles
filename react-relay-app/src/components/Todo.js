import path from 'path';
import TodoTextInput from './TodoTextInput';

import React, {useState} from 'react';
import {createFragmentContainer, graphql} from 'react-relay';
import classnames from 'classnames';

// eslint-disable-next-line
const ChangeTodoStatus = require(path.join(__dirname, '../../data/schema/mutations/ChangeTodoStatusMutation'));
// eslint-disable-next-line
const RemoveTodo = require(path.join(__dirname, '../../data/schema/mutations/RemoveTodoMutation'));
// eslint-disable-next-line
const RenameTodo = require(path.join(__dirname, '../../data/schema/mutations/RenameTodoMutation'));

const Todo = ({relay, todo, user}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleCompleteChange = (e) => {
    const complete = e.currentTarget.checked;
    ChangeTodoStatus.commit(relay.environment, complete, todo, user);
  };

  const handleDestroyClick = () => removeTodo();
  const handleLabelDoubleClick = () => setIsEditing(true);
  const handleTextInputCancel = () => setIsEditing(false);

  const handleTextInputDelete = () => {
    setIsEditing(false);
    removeTodo();
  };

  const handleTextInputSave = (text) => {
    setIsEditing(false);
    RenameTodo.commit(relay.environment, text, todo);
  };

  const removeTodo = () =>
    RemoveTodo.commit(relay.environment, todo, user);

  return (
    <li
      className={classnames({
        completed: todo.complete,
        editing: isEditing,
      })}>
      <div className="view">
        <input
          checked={todo.complete}
          className="toggle"
          onChange={handleCompleteChange}
          type="checkbox"
        />

        <label onDoubleClick={handleLabelDoubleClick}>{todo.text}</label>
        <button className="destroy" onClick={handleDestroyClick} />
      </div>

      {isEditing && (
        <TodoTextInput
          className="edit"
          commitOnBlur={true}
          initialValue={todo.text}
          onCancel={handleTextInputCancel}
          onDelete={handleTextInputDelete}
          onSave={handleTextInputSave}
        />
      )}
    </li>
  );
};

export default createFragmentContainer(Todo, {
  todo: graphql`
    fragment Todo_todo on Todo {
      complete
      id
      text
    }
  `,
  user: graphql`
    fragment Todo_user on User {
      id
      userId
      totalCount
      completedCount
    }
  `,
});