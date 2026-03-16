import mongoose from 'mongoose';
const userSchema  = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    credits : {
        type : Number,
        default : 100,
        min : 0
    },
    isCreditsPurchased : {
        type : Boolean,
        default : true
    },
    notes : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : "Notes",
        default : []
    }

},{timestamps : true}) // kab update hua kab delete hua

const UserModel = mongoose.model("UserModel", userSchema) 

export default UserModel