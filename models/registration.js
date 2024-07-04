import mongoose from "mongoose";
const nuser=mongoose.Schema;
let newuser= new nuser({
    name:{
        type:String,
        required:true
       },
       password:{
        type:String,
        required:true
       },
       mail:{
        type:String,
        required:true
       },
       status:{
        type:String,
        required:false
       }
})
export default mongoose.model("User",newuser)