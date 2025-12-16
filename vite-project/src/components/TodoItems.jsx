import { useTodos } from "../context/TodoContext";
import Button from "./Common_Components/Button";

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
          <Button
            label="Save"
            onClick={() => saveEdit(todo.id)}
            className="bg-green-500 text-white"
          />
        ) : (
          <Button
            label="Edit"
            onClick={() => startEdit(todo)}
            className="bg-blue-500 text-white"
          />
        )}

        <Button
          label="🗑"
          onClick={() => deleteTodo(todo.id)}
          className="bg-gray-200 hover:bg-red-500 hover:text-white"
        />
      </div>
    </li>
  );
};

export default TodoItem;
