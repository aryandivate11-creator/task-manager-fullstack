import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-zinc-800 text-white
        transform transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-4 text-lg font-semibold border-b border-zinc-700">
          Menu
        </div>

        <ul className="p-4 space-y-3">
          <li>
            <Link to="/todo" onClick={toggleSidebar}>
              Todos
            </Link>
          </li>
          <li>
            <Link to="/profile" onClick={toggleSidebar}>
              Profile
            </Link>
          </li>
          <li>
            <Link to="/settings" onClick={toggleSidebar}>
              Settings
            </Link>
          </li>
          {/* <li>
             <Link to="/signup" onClick={toggleSidebar}>
             Signup
             </Link>
          </li>
          <li>
            <Link to="/" onClick={toggleSidebar}>
            Login
            </Link>
          </li> */}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
