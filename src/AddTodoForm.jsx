import { useState } from "react";
import InputWithLabel from "./InputWithLabel";

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
      <InputWithLabel
        id="todoTitle"
        value={todoTitle}
        onInputChange={handleTitleChange}
      ></InputWithLabel>
      <button type="submit">Add Todo</button>
    </form>
  );
}

export default AddTodoForm;
