const mongoose=require('mongoose');

const teamSchema=new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    members:{
        member:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    }
})