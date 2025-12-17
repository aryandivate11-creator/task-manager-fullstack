import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import TodoApp from "./components/TodoApp";
import { TodoProvider } from "./context/TodoContext";
import { Routes, Route } from "react-router-dom";


import TodoPage from "./pages/TodoPage";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Signup from "./components/auth/signup";
import Login from "./components/auth/login";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-zinc-900">
      {/* Navbar */}
      <Navbar toggleSidebar={toggleSidebar} />

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="pt-14">
      <Routes>
        {/* Todo Page */}
        <Route
          path="/todo"
          element={
            <TodoProvider>
              <TodoApp />
            </TodoProvider>
          }
        />

        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Dummy Pages */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/Todopage" element={<TodoPage />} />
      </Routes>
    </div>
    </div>
  );
};

export default App;
