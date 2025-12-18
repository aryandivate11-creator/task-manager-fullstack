import { useNavigate } from "react-router-dom";

const Navbar = ({ toggleSidebar, setIsLoggedIn }) => {
  const navigate = useNavigate();

 const handleLogout = () => {
  localStorage.removeItem("isLoggedIn");
  setIsLoggedIn(false); // ❗ needs access
  navigate("/");
};

  return (
    <div className="h-14 bg-zinc-900 text-white flex items-center justify-between px-4">
      <button onClick={toggleSidebar} className="text-2xl">
        ☰
      </button>

      <button
        onClick={handleLogout}
        className="text-sm bg-zinc-700 px-3 py-1 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
