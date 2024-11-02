import React from "react";

const todoList = [
  { id: 1, title: "Complete assignment" },
  { id: 2, title: "Review React documentation" },
  { id: 3, title: "Plan next project" },
];

function App() {
  return (
    <div>
      <h1>Todo List</h1>
      {todoList.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </div>
  );
}

export default App;
