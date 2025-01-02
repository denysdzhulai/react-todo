import React from "react";

function TodoListItem({ id, title, onRemoveTodo }) {
  return (
    <li>
      {title}{" "}
      <button type="button" onClick={() => onRemoveTodo(id)}>
        Remove
      </button>
    </li>
  );
}

export default TodoListItem;
