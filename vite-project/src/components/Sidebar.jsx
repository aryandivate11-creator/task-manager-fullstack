import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={toggleSidebar}
      PaperProps={{
        sx: {
          width: 260,
          backgroundColor: "#020617",
          color: "white",
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          borderBottom: "1px solid #1e293b",
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          Menu
        </Typography>
      </Box>

      {/* Links */}
      <List>
        {[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Todos", path: "/todo" },
          { label: "Profile", path: "/profile" },
          { label: "Settings", path: "/settings" },
        ].map((item) => (
          <ListItemButton
            key={item.label}
            component={Link}
            to={item.path}
            onClick={toggleSidebar}
            sx={{
              "&:hover": {
                backgroundColor: "#1e293b",
              },
            }}
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
