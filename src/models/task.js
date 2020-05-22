const mongoose=require('mongoose');
// const moment=require('moment');

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
    // dueDateTime:{
    //     type: Date,
    //     required:true,
    // },
    // owner:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref:'User'
    // },
    labels:[{
        label:{
            type:String,
        }
    }]
},{
    timestamps:true
})

const Task=mongoose.model('Task',taskSchema)

module.exports=Task;