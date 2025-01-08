import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

const App = () => {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data from Airtable or localStorage
  useEffect(() => {
    const fetchData = async () => {
      const url = `https://api.airtable.com/v0/${
        import.meta.env.VITE_AIRTABLE_BASE_ID
      }/${import.meta.env.VITE_TABLE_NAME}`;
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        },
      };

      try {
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
          const todos = data.records.map((record) => ({
            id: record.id,
            title: record.fields.title,
          }));
          setTodoList(todos);
        } else {
          throw new Error(`Error: ${response.status}`);
        }
      } catch (error) {
        console.error("Fetch error from Airtable:", error.message);

        // Fallback to localStorage if Airtable fetch fails
        setTimeout(() => {
          const savedTodos =
            JSON.parse(localStorage.getItem("savedTodoList")) || [];
          setTodoList(savedTodos);
        }, 2000);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  const addTodo = async (newTodo) => {
    // Add to Airtable first
    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${import.meta.env.VITE_TABLE_NAME}`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
      body: JSON.stringify({
        fields: {
          title: newTodo.title,
        },
      }),
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      const createdTodo = {
        id: data.id,
        title: data.fields.title,
      };

      setTodoList((prevList) => [...prevList, createdTodo]);
    } catch (error) {
      console.error("Add Todo error:", error.message);

      // Fallback to localStorage if Airtable fails
      setTodoList((prevList) => [...prevList, newTodo]);
    }
  };

  const removeTodo = async (id) => {
    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${import.meta.env.VITE_TABLE_NAME}/${id}`;
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      setTodoList((prevList) => prevList.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Remove Todo error:", error.message);
    }
  };

  return (
    <>
      <h1>Plan. Execute. Repeat</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <AddTodoForm onAddTodo={addTodo} />
          <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
        </>
      )}
    </>
  );
};

export default App;
