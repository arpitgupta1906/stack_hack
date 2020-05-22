const mongoose=require('mongoose');

const teamSchema=new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    invitecode:{
        type:Number
    },
    agenda:{
        type:String,
        default:""
    },
    tasks:[{
        task:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task'
        }
    }],
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    members:[{
        member:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }]
})

const Team=mongoose.model('Team',taskSchema)

module.exports=Team;