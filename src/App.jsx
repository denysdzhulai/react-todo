import React from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

function useSemiPersistentState(key, initialState) {
  const [state, setState] = React.useState(() => {
    const savedState = localStorage.getItem(key);
    return savedState ? JSON.parse(savedState) : initialState;
  });

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

const App = () => {
  const [todoList, setTodoList] = useSemiPersistentState("savedTodoList", []);

  const addTodo = (newTodo) => {
    setTodoList((prevList) => [...prevList, newTodo]);
  };

  const removeTodo = (id) => {
    setTodoList((prevList) => prevList.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <h1>Todo App</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
    </>
  );
};

export default App;
