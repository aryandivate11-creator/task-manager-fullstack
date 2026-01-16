// import { createContext, useContext, useState } from "react";

// export const TodoContext = createContext();

// export const TodoProvider = ({ children }) => {
//   const [task, setTask] = useState("");
//   const [todos, setTodos] = useState([]);
//   const [filter, setFilter] = useState("all");
//   const [editId, setEditId] = useState(null);
//   const [editText, setEditText] = useState("");

//   const addTodo = (e) => {
//     e.preventDefault();
//     if (!task.trim()) return;

//     setTodos([
//       ...todos,
//       { id: Date.now(), text: task, completed: false },
//     ]);
//     setTask("");
//   };

//   const toggleTodo = (id) => {
//     setTodos(
//       todos.map((todo) =>
//         todo.id === id
//           ? { ...todo, completed: !todo.completed }
//           : todo
//       )
//     );
//   };

//   const deleteTodo = (id) => {
//     setTodos(todos.filter((todo) => todo.id !== id));
//   };

//   const startEdit = (todo) => {
//     setEditId(todo.id);
//     setEditText(todo.text);
//   };

//   const saveEdit = (id) => {
//     if (!editText.trim()) return;

//     setTodos(
//       todos.map((todo) =>
//         todo.id === id ? { ...todo, text: editText } : todo
//       )
//     );
//     setEditId(null);
//     setEditText("");
//   };

//   const filteredTodos = todos.filter((todo) => {
//     if (filter === "active") return !todo.completed;
//     if (filter === "completed") return todo.completed;
//     return true;
//   });

//   return (
//     <TodoContext.Provider
//       value={{
//         task,
//         setTask,
//         todos: filteredTodos,
//         filter,
//         setFilter,
//         addTodo,
//         toggleTodo,
//         deleteTodo,
//         startEdit,
//         saveEdit,
//         editId,
//         editText,
//         setEditText,
//       }}
//     >
//       {children}
//     </TodoContext.Provider>
//   );
// };


import { createContext, useContext, useEffect, useState } from "react";
import {
  fetchTodos,
  addTodoApi,
  toggleTodoApi,
  updateTodoApi,
  deleteTodoApi,
} from "../api/todoApi";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  // UI state
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch todos from backend on mount
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const data = await fetchTodos();
        setTodos(data.todos || []);
      } catch (error) {
        console.error("Failed to fetch todos", error);
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, []);

  // 🔹 Add todo (POST)
  const addTodo = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    try {
      const newTodo = await addTodoApi(task);
      setTodos((prev) => [newTodo, ...prev]);
      setTask("");
    } catch (error) {
      console.error("Add todo failed", error);
    }
  };

  // 🔹 Toggle todo (PUT)
  const toggleTodo = async (id,completed) => {
    try {
      await toggleTodoApi(id);
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id
            ? { ...todo, completed}
            : todo
        )
      );
    } catch (error) {
      console.error("Toggle todo failed", error);
    }
  };

  // 🔹 Delete todo (DELETE)
  const deleteTodo = async (id) => {
    try {
      await deleteTodoApi(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Delete todo failed", error);
    }
  };

  // 🔹 Start edit (UI only)
  const startEdit = (todo) => {
    setEditId(todo.id);
    setEditText(todo.title);
  };

  // 🔹 Save edit (PUT title)
  const saveEdit = async (id) => {
    if (!editText.trim()) return;

    try {
      await updateTodoApi(id, editText);
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, title: editText } : todo
        )
      );
      setEditId(null);
      setEditText("");
    } catch (error) {
      console.error("Edit todo failed", error);
    }
  };

  // 🔹 Frontend-only filtering (UNCHANGED)
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <TodoContext.Provider
      value={{
        task,
        setTask,
        todos: filteredTodos,
        filter,
        setFilter,
        addTodo,
        toggleTodo,
        deleteTodo,
        startEdit,
        saveEdit,
        editId,
        editText,
        setEditText,
        loading,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => useContext(TodoContext);
