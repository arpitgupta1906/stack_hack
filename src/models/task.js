const mongoose=require('mongoose');

const taskSchema=new mongoose.Schema({
    description:{
        type: String,
        required:true,
        trim: true,
    },
    completed:{
        type: Boolean,
        default: false,
    },
    overdue:{
        type:Boolean,
        default: false,
    },
    notes:{
        type:String,
        trim: true,
    },
    status:{
        type:String,
        enum:['New','InProgress','Completed'],
        default:"New"
    },
    percentCompleted:{
        type:Number,
        default:0
    },
    dueDateTime:{
        type: Date,
        required:true,
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    },
    team:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Team'
    },
    labels:{
        type:String,
        enum:['Personal', 'Work', 'Shopping','Others'],
        default:"Others",
    }
},{
    timestamps:true
})

const Task=mongoose.model('Task',taskSchema)

module.exports=Task;