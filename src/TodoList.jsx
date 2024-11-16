import React from "react";
import TodoListItem from "./TodoListItem";

const TodoList = () => {
  const todoList = [
    { id: 1, title: "Complete assignment" },
    { id: 2, title: "Wash dishes" },
    { id: 3, title: "Read book" },
  ];

  return (
    <ul>
      {todoList.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
