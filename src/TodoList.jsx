import React from "react";
import TodoListItem from "./TodoListItem";

function TodoList({ todoList, onRemoveTodo }) {
  return (
    <ul>
      {todoList.map((todo) => (
        <TodoListItem
          key={todo.id}
          id={todo.id}
          title={todo.title}
          onRemoveTodo={onRemoveTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;
