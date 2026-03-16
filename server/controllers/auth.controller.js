import UserModel from "../models/user.model.js";
import { getToken } from "../utils/token.js";
export const googleAuth = async (req,res) => {
    try {

        const {name, email} = req.body;
        let user =  await UserModel.findOne({email});

        if(!user){
            user = await UserModel.create({name, email})
    }
    let token = await getToken(user._id);
    res.cookie("token", token, {
        httpOnly : true,
        secure : true, // Set to true in production with HTTPS
        sameSite : 'none',
        maxAge : 30*24*60*60*1000 // 30 days
    })
    return res.status(200).json(user)

} catch (error) {
    return res.status(500).json({ message: "Google authentication failed", error: error.message })
}
}

//Logout function
export const logOut = async (req,res) =>{
    try{
        await res.clearCookie("token")
        return res.status(200).json({message : "Logged out successfully"})
    } catch (error) {
        return res.status(500).json({ message: "Logout failed", error: error.message })
 }
}