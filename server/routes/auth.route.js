import express from 'express';
import { googleAuth, logOut } from '../controllers/auth.controller.js';

const authRouter = express.Router()
//request krne k liye
authRouter.post('/google', googleAuth) //googleauth wala function yaha pe call krne k liye
//function call pe user ke data ko database me save krna hai aur token generate krna hai
authRouter.get('/logout', logOut) //logout function ko call krne ke liye

export default authRouter; //server index.js me isko import krke use krna hai