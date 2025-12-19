import { Box, Typography } from "@mui/material";
import { useTodos } from "../context/UseTodos.js";
import TodoItem from "./TodoItems";

const TodoList = () => {
  const { todos } = useTodos();

  if (todos.length === 0) {
    return (
      <Typography
        align="center"
        color="text.secondary"
        mt={2}
      >
        No tasks yet
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </Box>
  );
};

export default TodoList;
