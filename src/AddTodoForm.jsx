import React, { useState } from "react";

function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = useState("");

  const handleTitleChange = (event) => {
    setTodoTitle(event.target.value);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    if (todoTitle.trim() !== "") {
      onAddTodo({ id: Date.now(), title: todoTitle });
      setTodoTitle("");
    }
  };

  return (
    <form onSubmit={handleAddTodo}>
      <input
        type="text"
        placeholder="Add a new todo"
        value={todoTitle}
        onChange={handleTitleChange}
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}

export default AddTodoForm;
