import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

const App = () => {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = () => {
      setTimeout(() => {
        const savedTodos =
          JSON.parse(localStorage.getItem("savedTodoList")) || [];
        setTodoList(savedTodos);
        setIsLoading(false);
      }, 2000);
    };

    fetchTodos();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  // Function to add a new todo item
  const addTodo = (newTodo) => {
    setTodoList((prevList) => [...prevList, newTodo]);
  };

  return (
    <div>
      <h1>Todo App</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <AddTodoForm onAddTodo={addTodo} />
          <TodoList todoList={todoList} />
        </>
      )}
    </div>
  );
};

export default App;
