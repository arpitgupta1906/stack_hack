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
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task'
    }],
    members:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
    }]
})

const Team=mongoose.model('Team',teamSchema)

module.exports=Team;