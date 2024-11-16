import React from "react";

const AddTodoForm = (props) => {
  const handleAddTodo = (event) => {
    event.preventDefault(); // Prevent form submission
    const todoTitle = event.target.title.value; // Get input value
    props.onAddTodo(todoTitle); // Pass the new todo title to the parent
    event.target.reset(); // Reset the form
  };

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Title</label>
      <input type="text" id="todoTitle" name="title" />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodoForm;
