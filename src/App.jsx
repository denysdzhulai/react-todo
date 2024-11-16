import React, { useState } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

const App = () => {
  const [newTodo, setNewTodo] = useState("");

  return (
    <div>
      <h1>Todo App</h1>
      <AddTodoForm onAddTodo={setNewTodo} />
      <p>New Todo: {newTodo}</p>
      <TodoList />
    </div>
  );
};

export default App;
