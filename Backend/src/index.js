import pool from "./config/db.js";
import dotenv from 'dotenv';
import app from './app.js';

dotenv.config({
    path: '.env'
});

const port = process.env.PORT || 3000;

app.get('/',(req,res) =>{
    res.send('<h1>Hello TechStalwarts</h1');
})

const testDBConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("MySQL connected successfully ✅");
    connection.release();
  } catch (error) {
    console.error("MySQL connection failed ❌", error);
  }
};

testDBConnection();

app.listen(port,() =>{
    console.log(`Server running on http://localhost:${port}`);
})

