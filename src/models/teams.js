const mongoose=require('mongoose');

const teamSchema=new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    invitecode:{
        type:Number
    },
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
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
    members:[{
        member:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }]
})

const Team=mongoose.model('Team',teamSchema)

module.exports=Team;