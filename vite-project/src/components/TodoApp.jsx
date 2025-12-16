import TodoForm from "./TodoForm";
import TodoFilters from "./TodoFilters";
import TodoList from "./TodoList";

const TodoApp = () => {
  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
      <div className="bg-white w-full max-w-xl p-8 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-semibold mb-6">📝 To-Do List</h1>
        <TodoForm />
        <TodoFilters />
        <TodoList />
      </div>
    </div>
  );
};

export default TodoApp;
