import { Box, Button } from "@mui/material";
import { useTodos } from "../context/UseTodos.js";

const TodoFilters = () => {
  const { filter, setFilter } = useTodos();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 1.5,
        mb: 3,
      }}
    >
      {["all", "active", "completed"].map((type) => (
        <Button
          key={type}
          size="small"
          variant={filter === type ? "contained" : "outlined"}
          color={filter === type ? "warning" : "inherit"}
          onClick={() => setFilter(type)}
          sx={{
            textTransform: "capitalize",
            borderRadius: 999,
          }}
        >
          {type}
        </Button>
      ))}
    </Box>
  );
};

export default TodoFilters;
