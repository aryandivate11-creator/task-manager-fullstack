import bcrypt from "bcrypt";
import pool from "../config/db.js";

export const signup = async (req,res) =>{
    const {email , password , username, phone} = req.body;
    console.log(req.body);

    if (!email || !password || !username ){
      return res.status(400).json({
         error:"Email, password and username are required !"
      });
    }
    
    try{
      const [existinguser] = await pool.query(
         "SELECT id FROM users WHERE email = ?",
         [email]
      );

      if(existinguser.length > 0){
        return res.status(400).json({
          error:"User already exists !"
        });
      }

      const hashedpassword = await bcrypt.hash(password,10);
      console.log("Hashed password:", hashedpassword);

      await pool.query(
         `INSERT INTO users (username, email, phone, password)
         VALUES (?, ?, ?, ?)`,
         [username , email , phone , hashedpassword]
      );

       res.status(201).json({
         message:"User Signed up sucessfully !!!"
      });

    } catch(error){
      console.error(error);
      res.status(500).json({
         error:"Internal Server Error"
      });
    }

   //  if (password.length < 6){
   //    return res.status(400).json({
   //       error:"Password must be atleast 6 characters long !"
   //    });
   //  }
   
   //  if(!email.includes("@")){
   //    return res.status(400).json({
   //       error:"Please enter a valid email address !"
   //    })
   //  }

//     res.status(201).json({
//       message:"User registered sucessfully !!!",
//       user :{email},
//     })
};

export const login = async (req,res) =>{
      const {email, password} = req.body;

      if(!email || !password){
         return res.status(400).json({
            error:"Email and password are required"
         });
      }

     try {
      const [users] = await pool.query(
         "SELECT * FROM users WHERE email = ?",
         [email]
      );
      
      if(users.length === 0){
         return res.status(400).json({
            error:"Invalid email or password !"
         })
      };

      const user = users[0];

      const isPasswordValid = await bcrypt.compare(password , user.password);

      if(!isPasswordValid){
         return res.status(400).json({
            error:"Invalid email or password !"
         })
      };

      res.status(200).json({
         message:"Login Successful",
         user:{
            id: user.id,
            username: user.username,
            email: user.email,
         },
      });
     } catch (error) {
      console.error(error);
      res.status(500).json({
         error:"Internal Server Error"
      });
     }
};