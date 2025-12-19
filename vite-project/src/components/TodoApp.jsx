import { Box, Paper, Typography } from "@mui/material";
import TodoForm from "./TodoForm";
import TodoFilters from "./TodoFilters";
import TodoList from "./TodoList";

const TodoApp = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#020617",
        pt: 8,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          width: "100%",
          maxWidth: 520,
          p: 4,
          borderRadius: 3,
          background: "linear-gradient(145deg, #1e293b, #0f172a)",
          border: "1px solid #334155",
          color: "white",
          transition: "box-shadow 0.3s ease",
          "&:hover": {
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            },
        }}
      >
        <Typography
          variant="h5"
          fontWeight={700}
          mb={3}
        >
          📝 To-Do List
        </Typography>

        <TodoForm />
        <TodoFilters />
        <TodoList />
      </Paper>
    </Box>
  );
};

export default TodoApp;
