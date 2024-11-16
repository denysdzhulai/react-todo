import React from "react";

const TodoList = () => {
  const todoList = [
    { id: 1, title: "Complete assignment" },
    { id: 2, title: "Review React documentation" },
    { id: 3, title: "Plan next project" },
  ];

  return (
    <ul>
      {todoList.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
};

export default TodoList;
