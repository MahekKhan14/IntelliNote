//Route for user authentication and user related work like getting user details, updating user details, deleting user etc.
import express from 'express';
import isAuth from '../middleware/isAuth.js';
import { getCurrentUser } from '../controllers/user.controller.js';
import UserModel from '../models/user.model.js';


const userRouter = express.Router()

userRouter.get('/currentUser', isAuth, getCurrentUser)

export default userRouter; //server index.js me isko import krke use krna hai
