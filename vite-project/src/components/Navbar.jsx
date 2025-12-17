const Navbar = ({ toggleSidebar }) => {
  return (
    <div className="h-14 bg-zinc-900 text-white flex items-center px-4">
      <button
        onClick={toggleSidebar}
        className="text-2xl font-bold"
      >
        ☰
      </button>

      <h1 className="ml-4 text-lg font-semibold">
        Todo App
      </h1>
    </div>
  );
};

export default Navbar;
