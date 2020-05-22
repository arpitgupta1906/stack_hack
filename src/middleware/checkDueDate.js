const Task=require('../models/task');

const date=Date.now();

const checkDueDate=setInterval(()=>{
    var tasks;
    Task.find({
            'completed': false,
             'overdue': false,
            // dueDateTime : { $gte: date}
        }).then(res=>{
            res.map((r)=>{
                console.log(r,i);
            })
            // console.log(res);
        })
    // console.log(tasks);
    // if(tasks){
    //     console.log(tasks[0]._id)
    // }

    return console.log('checking...');
}, 3000);

module.exports=checkDueDate;
