import { useTodos } from "../context/UseTodos.js";

const TodoFilters = () => {
  const { filter, setFilter } = useTodos();

  return (
    <div className="flex justify-center gap-3 mb-6">
      {["all", "active", "completed"].map((type) => (
        <button
          key={type}
          onClick={() => setFilter(type)}
          className={`px-4 py-2 rounded-full ${
            filter === type
              ? "bg-orange-500 text-white"
              : "bg-gray-200"
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

export default TodoFilters;
