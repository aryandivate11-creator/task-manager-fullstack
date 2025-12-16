import { useTodos } from "../context/TodoContext";
import TodoItem from "./TodoItems";

const TodoList = () => {
  const { todos } = useTodos();

  return (
    <ul className="space-y-4">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
