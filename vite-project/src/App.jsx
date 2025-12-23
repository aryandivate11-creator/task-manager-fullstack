import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import TodoApp from "./components/TodoApp";
import { TodoProvider } from "./context/TodoContext";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/routes/ProtectedRoute"


import TodoPage from "./pages/TodoPage";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Signup from "./components/auth/signup";
import Login from "./components/auth/login";
import Dashboard from "./pages/Dashboard";


const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
  localStorage.getItem("isLoggedIn") === "true"
);


  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-zinc-900">

      {/* Navbar & Sidebar ONLY after login */}
      {isLoggedIn && (
           <>
           <Navbar
           toggleSidebar={toggleSidebar}
          setIsLoggedIn={setIsLoggedIn}
          />
        <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
          />
         </>
)}

      {/* Main Content */}
      <div className={isLoggedIn ? "pt-14" : ""}>
        <Routes>
          <Route
            path="/todo"
            element={
              <ProtectedRoute>
                <TodoProvider>
                  <TodoApp />
                </TodoProvider>
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/Todopage" element={<TodoPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
