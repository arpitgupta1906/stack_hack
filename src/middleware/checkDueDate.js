const Task=require('../models/task');


const checkDueDate=setInterval(()=>{
    var tasks;
    const date=new Date().toISOString()
    
    Task.find({
            'completed': false,
             'overdue': false,
            'dueDateTime' : { $lte: date}
        }).then(res=>{
            res.map((r)=>{
              r['overdue']=true;
              r.save()  
              
              console.log(r.description)
            })
        }).catch((e)=>{
            console.log("None Due");
        })
        


    return console.log('checking...');
}, 3000);

module.exports=checkDueDate;
