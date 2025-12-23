import {
  Box,
  Checkbox,
  TextField,
  Typography,
} from "@mui/material";
import { useTodos } from "../context/UseTodos.js";
import Button from "./Common_Components/Button";

const TodoItem = ({ todo }) => {
  const {
    toggleTodo,
    deleteTodo,
    startEdit,
    saveEdit,
    editId,
    editText,
    setEditText,
  } = useTodos();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
      }}
    >
      {/* Left */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Checkbox
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          color="success"
        />

        {editId === todo.id ? (
          <TextField
            size="small"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
             sx={{
             backgroundColor: "#f8fafc",
             borderRadius: 1,
             input: {
             color: "#020617",
             fontWeight: 500,
                 },
               }}
          />
        ) : (
          <Typography
            sx={{
              textDecoration: todo.completed
                ? "line-through"
                : "none",
              color: todo.completed ? "#94a3b8" : "#f8fafc",
              fontWeight: todo.completed ? 400 : 500,
              wordBreak: "break-word",
              maxWidth: { xs: 180, sm: 300 },
            }}
          >
            {todo.text}
          </Typography>
        )}
      </Box>

      {/* Actions */}
      <Box sx={{ display: "flex", gap: 1 }}>
        {editId === todo.id ? (
          <Button
            label="Save"
            onClick={() => saveEdit(todo.id)}
            color="success"
          />
        ) : (
          <Button
            label="Edit"
            onClick={() => startEdit(todo)}
            color="primary"
          />
        )}

        <Button
          label="🗑"
          onClick={() => deleteTodo(todo.id)}
          color="error"
        />
      </Box>
    </Box>
  );
};

export default TodoItem;
