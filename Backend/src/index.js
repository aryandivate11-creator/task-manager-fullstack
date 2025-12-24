import dotenv from 'dotenv';
import app from './app.js';

dotenv.config({
    path: '.env'
});

const port = process.env.PORT || 3000;

app.get('/',(req,res) =>{
    res.send('<h1>Hello TechStalwarts</h1');
})

app.listen(port,() =>{
    console.log(`Server running on http://localhost:${port}`);
})