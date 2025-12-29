import { useState, useEffect } from "react";
import { useNavigate, Link, data } from "react-router-dom";

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

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isloggedin");
    if (isLoggedIn) {
      navigate("/todo");
    }
  }, [navigate]);

  const [email, setEmail] = useState("");   
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch('http://localhost:3000/api/auth/login',{
        method:'POST',
        headers:{
          'content-type':'application/json',
        },
        body:JSON.stringify({email,password}),
      }
    );
      const data = await res.json();

      if(!res.ok){
        setError(data.error);
        return;
      }

      localStorage.setItem("token",data.token);
      localStorage.setItem("isloggedin",true);
      localStorage.setItem("user", JSON.stringify(data.user));

      setIsLoggedIn(true);
      navigate("/todo");
    } catch (error) {
      setError("Server not reachable. Please try again later.")
    }
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
          width: 420,
          padding: "32px",
          borderRadius: "20px",
          backgroundColor: "#0f172a",
        }}
      >
        {/* Header */}
        <Box textAlign="center" mb={3}>
          <Typography
            variant="h5"
            fontWeight="700"
            color="white"
          >
            Welcome back
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#94a3b8" }}
          >
            Login to continue
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{ style: { color: "#94a3b8" } }}
            sx={{
              input: { color: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#334155",
                },
                "&:hover fieldset": {
                  borderColor: "#64748b",
                },
              },
            }}
          />

          <TextField
            fullWidth
            label="Password"
            margin="normal"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{ style: { color: "#94a3b8" } }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setShowPassword((prev) => !prev)
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
            sx={{
              input: { color: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#334155",
                },
                "&:hover fieldset": {
                  borderColor: "#64748b",
                },
              },
            }}
          />

          {error && (
            <Typography
              color="error"
              variant="body2"
              mt={1}
            >
              {error}
            </Typography>
          )}

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
            Login
          </Button>

          <Typography
            variant="body2"
            align="center"
            mt={3}
            sx={{ color: "#94a3b8" }}
          >
            Don’t have an account?{" "}
            <Link
              to="/signup"
              style={{ color: "#f97316" }}
            >
              Signup
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
