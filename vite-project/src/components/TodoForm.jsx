import { Box, TextField } from "@mui/material";
import { useTodos } from "../context/UseTodos.js";
import Button from "./Common_Components/Button";

const TodoForm = () => {
  const { task, setTask, addTodo } = useTodos();

  return (
    <Box
      component="form"
      onSubmit={addTodo}
      sx={{
        display: "flex",
        gap: 2,
        mb: 3,
      }}
    >
      <TextField
        fullWidth
        placeholder="Add a new task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        sx={{
          input: { color: "white" },
          "& .MuiOutlinedInput-root": {
            borderRadius: 999,
          },
        }}
      />

      <Button
        type="submit"
        label="ADD +"
        color="warning"
        sx={{
          whiteSpace: "nowrap",
          px: 3,
          minWidth: "90px",
        }}
      />
    </Box>
  );
};

export default TodoForm;
