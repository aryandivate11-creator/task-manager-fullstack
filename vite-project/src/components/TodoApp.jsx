import { useState } from "react";

function TodoApp() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [filter, setFilter] = useState("all"); // all | active | completed

  /* ---------------- Add Todo ---------------- */
  const addTodo = (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: task,
        completed: false,
      },
    ]);
    setTask("");
  };

  /* ---------------- Toggle ---------------- */
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  /* ---------------- Delete ---------------- */
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  /* ---------------- Edit ---------------- */
  const startEdit = (todo) => {
    setEditId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = (id) => {
    if (!editText.trim()) return;

    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editText } : todo
      )
    );
    setEditId(null);
    setEditText("");
  };

  /* ---------------- Filtering Logic ---------------- */
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
      <div className="bg-white w-full max-w-xl p-8 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-semibold mb-6">📝 To-Do List</h1>

        {/* Add Todo */}
        <form onSubmit={addTodo} className="flex gap-3 mb-5">
          <input
            type="text"
            placeholder="Add a new task..."
            className="flex-1 bg-gray-100 rounded-full px-5 py-3 text-base focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button
            type="submit"
            className="bg-orange-500 text-white px-6 py-3 rounded-full text-base hover:bg-orange-600 active:scale-95 transition"
          >
            ADD +
          </button>
        </form>

        {/* Filters */}
        <div className="flex justify-center gap-3 mb-6">
          {["all", "active", "completed"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-full text-sm transition ${
                filter === type
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Todo List */}
        <ul className="space-y-4">
          {filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="w-6 h-6 accent-orange-500 transition"
                />

                {editId === todo.id ? (
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="border rounded px-3 py-2 text-base"
                  />
                ) : (
                  <span
                    className={`text-base transition-all duration-300 ${
                      todo.completed
                        ? "line-through text-gray-400"
                        : "text-gray-700"
                    }`}
                  >
                    {todo.text}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                {editId === todo.id ? (
                  <button
                    onClick={() => saveEdit(todo.id)}
                    className="text-green-500 hover:text-green-700 transition"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => startEdit(todo)}
                    className="text-blue-500 hover:text-blue-700 transition"
                  >
                    Edit
                  </button>
                )}

                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-gray-400 hover:text-red-500 transition"
                >
                  🗑
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Empty State */}
        {filteredTodos.length === 0 && (
          <p className="text-center text-gray-400 text-base mt-6 animate-pulse">
            No tasks found
          </p>
        )}
      </div>
    </div>
  );
}

export default TodoApp;
