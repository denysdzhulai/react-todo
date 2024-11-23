import React, { useState } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

const App = () => {
  const [todoList, setTodoList] = useState([]);

  const addTodo = (newTodo) => {
    setTodoList((prevList) => [...prevList, newTodo]);
  };

  return (
    <div>
      <h1>Todo App</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} />
    </div>
  );
};

export default App;
