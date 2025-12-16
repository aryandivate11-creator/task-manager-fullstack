import { useTodos } from "../context/TodoContext";
import Button from "./Common_Components/Button";

const TodoForm = () => {
  const { task, setTask, addTodo } = useTodos();

  return (
    <form onSubmit={addTodo} className="flex gap-3 mb-5">
      <input
        type="text"
        placeholder="Add a new task..."
        className="flex-1 bg-gray-100 rounded-full px-5 py-3"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
       <Button
        type="submit"
        label="ADD +"
        className="bg-orange-500 text-white hover:bg-orange-600"
      />
    </form>
  );
};

export default TodoForm;
