import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Divider,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

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
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.username)
      newErrors.username = "Username is required";
    if (formData.username && formData.username.length < 3)
      newErrors.username =
        "Username must be at least 3 characters";

    if (!formData.email)
      newErrors.email = "Email is required";
    if (
      formData.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    )
      newErrors.email = "Invalid email format";

    if (!formData.phone)
      newErrors.phone = "Phone number is required";
    if (
      formData.phone &&
      !/^[6-9]\d{9}$/.test(formData.phone)
    )
      newErrors.phone =
        "Phone must be 10 digits and start with 6–9";

    if (!formData.password)
      newErrors.password = "Password is required";
    if (
      formData.password &&
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/.test(
        formData.password
      )
    )
      newErrors.password =
        "Password must contain uppercase, digit & special character";

    if (!formData.confirmPassword)
      newErrors.confirmPassword =
        "Please confirm password";
    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    )
      newErrors.confirmPassword =
        "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    localStorage.setItem("user", JSON.stringify(formData));
    alert("Signup successful! Please login.");
    navigate("/");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(circle at top, #1e293b, #020617)",
      }}
    >
      <Paper
        elevation={10}
        sx={{
          width: 460,
          padding: "32px",
          borderRadius: "20px",
          backgroundColor: "#0f172a",
        }}
      >
        <Box textAlign="center" mb={3}>
          <Typography
            variant="h5"
            fontWeight="700"
            color="white"
          >
            Create Account
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#94a3b8" }}
          >
            Sign up to get started
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            margin="normal"
            value={formData.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
            sx={inputStyle}
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            sx={inputStyle}
          />

          <TextField
            fullWidth
            label="Phone"
            name="phone"
            margin="normal"
            value={formData.phone}
            onChange={handleChange}
            error={!!errors.phone}
            helperText={errors.phone}
            sx={inputStyle}
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            margin="normal"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setShowPassword((p) => !p)
                    }
                    sx={{ color: "#94a3b8" }}
                  >
                    {showPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={inputStyle}
          />

          <TextField
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            margin="normal"
            type={
              showConfirmPassword ? "text" : "password"
            }
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setShowConfirmPassword((p) => !p)
                    }
                    sx={{ color: "#94a3b8" }}
                  >
                    {showConfirmPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={inputStyle}
          />

          <Button
            type="submit"
            fullWidth
            sx={{
              color: "white",
              mt: 3,
              py: 1.4,
              fontSize: "1rem",
              fontWeight: 600,
              backgroundColor: "#f97316",
              "&:hover": {
                backgroundColor: "#ea580c",
              },
            }}
          >
            Sign Up
          </Button>

          <Typography
            align="center"
            variant="body2"
            mt={3}
            sx={{ color: "#94a3b8" }}
          >
            Already have an account?{" "}
            <Link to="/" style={{ color: "#f97316" }}>
              Login
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

const inputStyle = {
  input: { color: "white" },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#334155",
    },
    "&:hover fieldset": {
      borderColor: "#64748b",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#94a3b8",
  },
};

export default Signup;
