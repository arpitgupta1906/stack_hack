const mongoose=require('mongoose');

const teamSchema=new mongoose.Schema({
    name:{
        type:String,
        required: true,
        unique: true
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
    // tasks:[{
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'Task'
    // }],
    members:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
},{
    timestamps:true
})

teamSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'team'
})

const Team=mongoose.model('Team',teamSchema)

module.exports=Team;