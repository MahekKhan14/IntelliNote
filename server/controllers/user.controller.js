//User related work will be handled here like creating user, updating user, deleting user, getting user details etc.

import UserModel from "../models/user.model.js";
export const getCurrentUser = async(req,res) => {
    try {
        // Logic to get current user details from the database using the user ID from the token
        const userId = req.userId
        const user =  await UserModel.findById(userId)
        if(!user){
            return res.status(401).json({message : "User not found"})
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ message: "Failed to get user details", error: error.message })
    }
}
