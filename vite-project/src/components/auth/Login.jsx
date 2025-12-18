import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";



const Login = ({setIsLoggedIn}) => {
  const navigate = useNavigate();

  useEffect(() => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn) {
    navigate("/todo");
  }
}, [navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

 

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      setError("No account found. Please signup first.");
      return;
    }

    if (
      storedUser.email === email &&
      storedUser.password === password
    ) {
      setError("");

      localStorage.setItem("isLoggedIn", "true"); // persist login
      setIsLoggedIn(true);                        // update React state
      navigate("/todo");                         // go to Todo page
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-400 p-8 rounded-xl w-[420px] space-y-6 shadow-lg"
      >
        <h2 className="text-3xl font-bold text-center">Login</h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-lg text-black text-lg border border-zinc-500"
        />

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg text-black text-lg border border-zinc-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-3 text-sm text-zinc-600"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 transition py-3 rounded-lg text-lg font-semibold"
        >
          Login
        </button>
        <p className="text-center text-md text-zinc-900">
          Don’t have an account?{" "}
       <Link
        to="/signup"
       className="text-red-900 hover:underline"
         >
           Signup
        </Link>
       </p>

      </form>
    </div>
  );
};

export default Login;
