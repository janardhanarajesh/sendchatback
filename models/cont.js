import mongoose from "mongoose"
const cont=mongoose.Schema
let con=new cont({
    sender:{
        type:String,
        required:true
    },
    reciver:{
        type:String,
        required:true
    },
    chating:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    }

})
export default mongoose.model("Mutual",con)
