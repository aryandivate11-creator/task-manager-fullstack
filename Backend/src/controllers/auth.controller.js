export const signup = (req,res) =>{
     res.json({
        message:"Signup Route hit",
        data: req.body,
     })
}

export const login = (req,res) =>{
     res.json({
        message:"Login route hit",
        data: req.body,
     })
}