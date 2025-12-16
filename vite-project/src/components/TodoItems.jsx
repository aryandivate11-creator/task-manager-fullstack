import { useTodos } from "../context/TodoContext";


const TodoItem = ({ todo }) => {
  const {
    toggleTodo,
    deleteTodo,
    startEdit,
    saveEdit,
    editId,
    editText,
    setEditText,
  } = useTodos();

  return (
    <li className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />

        {editId === todo.id ? (
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
        ) : (
          <span className={todo.completed ? "line-through" : ""}>
            {todo.text}
          </span>
        )}
      </div>

      <div className="flex gap-3">
        {editId === todo.id ? (
          <button onClick={() => saveEdit(todo.id)}>Save</button>
        ) : (
          <button onClick={() => startEdit(todo)}>Edit</button>
        )}
        <button onClick={() => deleteTodo(todo.id)}>🗑</button>
      </div>
    </li>
  );
};

export default TodoItem;
