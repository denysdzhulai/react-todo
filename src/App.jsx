import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import "./index.css"; // Import updated styles

const App = () => {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoadingMessage, setShowLoadingMessage] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("title");

    // Show loading message only if loading takes more than 2 sec
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        setShowLoadingMessage(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isLoading]);

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
      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const data = await response.json();
      const todos = data.records.map((record) => ({
        id: record.id,
        title: record.fields.title,
        createdTime: record.createdTime,
      }));

      const sortedTodos = [...todos].sort((a, b) => {
        if (sortBy === "title") {
          return sortOrder === "asc"
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
        } else {
          return sortOrder === "asc"
            ? new Date(a.createdTime) - new Date(b.createdTime)
            : new Date(b.createdTime) - new Date(a.createdTime);
        }
      });

      setTodoList(sortedTodos);
    } catch (error) {
      console.error("Fetch error:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [sortOrder, sortBy]);
// Save to localStorage
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  const addTodo = async (newTodo) => {
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
      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const data = await response.json();
      const createdTodo = {
        id: data.id,
        title: data.fields.title,
        createdTime: data.createdTime,
      };

      setTodoList((prevList) => {
        const updatedList = [...prevList, createdTodo].sort((a, b) => {
          if (sortBy === "title") {
            return sortOrder === "asc"
              ? a.title.localeCompare(b.title)
              : b.title.localeCompare(a.title);
          } else {
            return sortOrder === "asc"
              ? new Date(a.createdTime) - new Date(b.createdTime)
              : new Date(b.createdTime) - new Date(a.createdTime);
          }
        });

        return updatedList;
      });
    } catch (error) {
      console.error("Add Todo error:", error.message);
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
      if (!response.ok) throw new Error(`Error: ${response.status}`);

      setTodoList((prevList) => prevList.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Remove Todo error:", error.message);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Default Route */}
        <Route
          path="/"
          element={
            <>
              <h1>Organize. Prioritize. Succeed.</h1>
              {isLoading ? (
                showLoadingMessage ? <p>Hold tight, magic is happening...</p> : null
              ) : (
                <>
                  <div className="sort-buttons">
                    <button
                      className={`sort-btn ${sortBy === "title" ? "active" : ""}`}
                      onClick={() => setSortBy("title")}
                    >
                      Sort by Title {sortOrder === "asc" ? "A-Z" : "Z-A"}
                    </button>
                    <button
                      className={`sort-btn ${sortBy === "createdTime" ? "active" : ""}`}
                      onClick={() => setSortBy("createdTime")}
                    >
                      Sort by Date {sortOrder === "asc" ? "Oldest First" : "Newest First"}
                    </button>
                    {/* <button
                      className="sort-btn"
                      onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                    >
                      Toggle Order
                    </button> */}
                  </div>

                  <AddTodoForm onAddTodo={addTodo} />
                  <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
                </>
              )}
            </>
          }
        />

        {/* New Route */}
        <Route path="/new" element={<h1>New Todo List</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
