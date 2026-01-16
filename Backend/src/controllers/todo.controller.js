
import pool from "../config/db.js";

export const getTodos = async (req,res) => {
    try {
        const userId = req.user.id;

        const [todos] = await pool.query(
            "SELECT * FROM todos WHERE user_id = ?",
            [userId]
        );

        res.status(200).json({
            todos,
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error:"Failed to fetch todos",
        });
    }
};

export const createTodo = async (req,res) =>{
    try {
        const { title } = req.body;

        if(!title || title.trim() === ""){
            return res.status(400).json({
                error:"Title is required"
            });
        };

        const userId = req.user.id;
        console.log("User ID in createTodo:", userId);

        const [result] =  await pool.query(
            "INSERT INTO todos (title, user_id) VALUES (?, ?)",
            [title, userId]
        );

        res.status(201).json({
            message:"Todo created successfully !",
            title,
            completed:false,
            id: result.insertId,
        })
    } catch (error) {
        console.error("createTodo Error:",error);
        res.status(500).json({
            error:"Failed to create todo",
        });
    }
};

export const toggleTodo = async (req,res) =>{
    try {
        const todoId = req.params.id;
        const userId = req.user.id;

        console.log("Todo ID:", todoId);
        console.log("User ID from token:", userId);

       const [result] = await pool.query(
      `UPDATE todos 
       SET completed = NOT completed 
       WHERE id = ? AND user_id = ?`,
      [todoId, userId]
    );

    
    console.log("Affected rows:", result.affectedRows);

    if(result.affectedRows === 0){
        return res.status(404).json({
            error:"Todo not found",
        });
    };

    res.status(200).json({
        message:"Todo status updated successfully !",
    });
    } catch (error) {
        console.error("toggleTodo Error:",error);
        res.status(500).json({
            error:"Failed to update todo status",
        })
    }
}

export const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const userId = req.user.id;

    const [result] = await pool.query(
      "DELETE FROM todos WHERE id = ? AND user_id = ?",
      [todoId, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Todo not found",
      });
    }

    res.status(200).json({
      message: "Todo deleted successfully",
    });
  } catch (error) {
    console.error("Delete todo error:", error);
    res.status(500).json({
      error: "Failed to delete todo",
    });
  }
};

export const updateTodoTitle = async (req, res) => {
  try {
    const todoId = req.params.id;
    const userId = req.user.id;
    const { title } = req.body;

    // validation
    if (!title || title.trim() === "") {
      return res.status(400).json({
        error: "Todo title is required",
      });
    }

    const [result] = await pool.query(
      `UPDATE todos
       SET title = ?
       WHERE id = ? AND user_id = ?`,
      [title, todoId, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Todo not found",
      });
    }

    res.status(200).json({
      message: "Todo updated successfully",
      id: todoId,
      title,
    });
  } catch (error) {
    console.error("Update todo title error:", error);
    res.status(500).json({
      error: "Failed to update todo",
    });
  }
};
