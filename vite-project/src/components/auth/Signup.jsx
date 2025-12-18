import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};

    // Required fields
    if (!formData.username)
      newErrors.username = "Username is required";

    if (!formData.email)
      newErrors.email = "Email is required";

    if (!formData.phone)
      newErrors.phone = "Phone number is required";

    if (!formData.password)
      newErrors.password = "Password is required";

    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Please confirm password";

    // Username length
    if (formData.username && formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    // Email format
    if (
      formData.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Invalid email format";
    }

    // Phone validation
    if (
      formData.phone &&
      !/^[6-9]\d{9}$/.test(formData.phone)
    ) {
      newErrors.phone =
        "Phone must be 10 digits and start with 6,7,8 or 9";
    }

    // Password strength
    if (
      formData.password &&
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/.test(
        formData.password
      )
    ) {
      newErrors.password =
        "Password must contain uppercase, digit & special character";
    }

    // Password match
    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  if (!validate()) return;

  localStorage.setItem("user", JSON.stringify(formData));

  alert("Signup successful! Please login.");

  navigate("/"); // 👈 redirect to login
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-400 p-8 rounded-xl w-[420px] space-y-6 shadow-lg"
      >
        <h2 className="text-3xl font-bold text-center">
          Create Account
        </h2>

        {/* Username */}
        <Input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          error={errors.username}
        />

        {/* Email */}
        <Input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        {/* Phone */}
        <Input
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
        />

        {/* Password */}
        <div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg text-black text-lg border border-zinc-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-sm text-zinc-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-900 text-sm mt-1">
              {errors.password}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <Input
          type={showPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="Reconfirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 transition py-3 rounded-lg text-lg font-semibold"
        >
          Sign Up
        </button>
        <p className="text-center text-md text-zinc-900">
         Already have an account?{" "}
         <Link
         to="/"
         className="text-red-900 hover:underline"
         >
          Login
         </Link>
         </p>

      </form>
    </div>
  );
};

/* Reusable Input Component */
const Input = ({
  name,
  placeholder,
  value,
  onChange,
  error,
  type = "text",
}) => (
  <div>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 rounded-lg text-black text-lg border border-zinc-500"
    />
    {error && (
      <p className="text-red-900 text-sm mt-1">{error}</p>
    )}
  </div>
);

export default Signup;
