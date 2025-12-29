
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