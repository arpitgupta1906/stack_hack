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
              r['overdue']=true;
              r.save()  

              console.log(r._id)
            })
        })
        


    return console.log('checking...');
}, 3000);

module.exports=checkDueDate;
