import { AppBar, Toolbar, IconButton, Button, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggleSidebar, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isloggedin");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#020617",
        boxShadow: "none",
        borderBottom: "1px solid #1e293b",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left: Hamburger */}
        <IconButton
          edge="start"
          color="inherit"
          onClick={toggleSidebar}
        >
          <MenuIcon />
        </IconButton>

        {/* Center: Title */}
        <Typography
          variant="h6"
          sx={{ fontWeight: 600 }}
        >
          Todo App
        </Typography>

        {/* Right: Logout */}
        <Button
          onClick={handleLogout}
          sx={{
            color: "#f97316",
            border: "1px solid #f97316",
            "&:hover": {
              backgroundColor: "#f97316",
              color: "#020617",
            },
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
