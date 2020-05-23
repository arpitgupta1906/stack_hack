const express=require('express')
const Task=require('../models/task')
const router=new express.Router()
const auth=require('../middleware/auth')

router.post('/tasks/add',async (req,res)=>{
    
    const task=new Task({
        ...req.body,
    })

    try{
        await task.save()
        res.status(201).send(task)
    }
    catch(e){
        res.status(400).send(e)
    }
})

router.get('/tasks/:id',async (req,res)=>{
    const _id=req.params.id;

    try{
        
        const task=await Task.findOne({_id,
            // owner:req.user._id
        })
    
        if(!task){
    
            return res.status(404).send()
        }
        // console.log(task.description)
        res.send(task)
        }catch(e){
            res.status(500).send();
        }
})



//GET /tasks?completed=true
//GET /tasks?label
//GET /tasks?limit=2&skip=2
//GET /tasks?sortBy=createdAt:desc
//GET /tasks?completed=true  gives archived

// router.get('/tasks', auth,async (req,res)=>{

//     const match={}
//     const sort={}

//     //since return type is string not boolean
//     if(req.query.completed){
//         match.completed=req.query.completed==='true'
//     }

    // if(req.query.label){
    //     match.labels=req.query.label
    // }

//     if(req.query.sortBy){
//         const parts=req.query.sortBy.split(':')
//         sort[parts[0]]=parts[1]==='desc'?-1:1
//     }

//     try{
//         // const task=await Task.find({owner:req.user._id});
//         await req.user.populate({
//             path: 'tasks',
//             match,
//             options:{
//                 limit: parseInt(req.query.limit),
//                 skip: parseInt(req.query.skip),
//                 sort
//             }
//         }).execPopulate()
//         res.send(req.user.tasks);
//     }
//     catch(error){
//         res.status(500).send(error);
//     }
    
// })

// router.get('/tasks/overdue', auth,async (req,res)=>{

//     const match={}
//     const sort={}

//     //since return type is string not boolean
//     match.overdue=true;
//     sort['dueDateTime']=1

//     try{
//         // const task=await Task.find({owner:req.user._id});
//         await req.user.populate({
//             path: 'tasks',
//             match,
//             options:{
//                 limit: parseInt(req.query.limit),
//                 skip: parseInt(req.query.skip),
//                 sort
//             }
//         }).execPopulate()
//         res.send(req.user.tasks);
//     }
//     catch(error){
//         res.status(500).send(error);
//     }
    
// })


// router.patch('/tasks/:id/completed',auth, async (req,res)=>{
//     const _id=req.params.id;

//     try{
//         const task=await Task.findOne({_id: req.params.id,owner: req.user._id})

//         if(!task){      
//             return res.status(404).send();
//         }

//         task['completed']=true;
//         task['overdue']=false;
    
//         await task.save()

//         res.send(task);
//     }
//     catch(e){
//         res.status(400).send(e);
//     }
// })

// router.patch('/tasks/:id', auth,async (req,res)=>{
//     const _id=req.params.id;
//     const updates=Object.keys(req.body);
//     const allowedupdates=['description','notes'];
//     isValidUpdate=updates.every((update)=> allowedupdates.includes(update))

//     if(!isValidUpdate){
//         return res.status(400),send({error:'Invalid updates!'})
//     }

//     try{
//         const task=await Task.findOne({_id: req.params.id,owner: req.user._id})

//         if(!task){      
//             return res.status(404).send();
//         }

//         updates.forEach((update)=>{
//             task[update]=req.body[update]
//         })

//         await task.save()

//         res.send(task);
//     }
//     catch(e){
//         res.status(400).send(e);
//     }
// })

// router.delete('/tasks/:id', auth,async (req,res)=>{
//     try{
//         const task=await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id});

//         if(!task)
//         {
//             res.status(404).send('Task not found')
//         }

//         res.send(task)
//     }
//     catch(e){
//         res.status(500).send();
//     }
// })

module.exports=router;