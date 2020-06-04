const express=require('express')
const Task=require('../models/task')
const router=new express.Router()
const auth=require('../middleware/auth')

router.post('/tasks/add', auth,async (req,res)=>{
    
    const task=new Task({
        ...req.body,
        owner: req.user._id
    })

    try{
        await task.save()
        res.status(201).send(task)
    }
    catch(e){
        res.status(400).send(e)
    }
})

router.get('/tasks/:id', auth,async (req,res)=>{
    const _id=req.params.id;

    try{
        
        const task=await Task.findOne({_id,
            owner:req.user._id
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

router.get('/tasks', auth,async (req,res)=>{

    const match={}
    const sort={}

    //since return type is string not boolean
    if(req.query.completed){
        match.completed=req.query.completed==='true'
    }

    if(req.query.labels){
        match.labels=req.query.labels
    }

    if(req.query.description){
        match.description=req.query.description
    }

    // if(req.query.dueDateTime){
    //     match.dueDateTime={
    //        $lte: req.query.dueDateTime
    //     }
    // }

    if(req.query.status){
        match.status=req.query.status
    }


    if(req.query.label){
        match.labels=req.query.label
    }
    
    sort['dueDateTime']=1;
    
    if(req.query.sortBy){
        const parts=req.query.sortBy.split(':')
        sort[parts[0]]=parts[1]==='desc'?-1:1
    }


    try{
        // const task=await Task.find({owner:req.user._id});
        await req.user.populate({
            path: 'tasks',
            match,
            options:{
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks);
    }
    catch(error){
        res.status(500).send(error);
    }
    
})

router.get('/overdue', auth,async (req,res)=>{
    const match={}
    const sort={}

    match['overdue']=true;
    sort['dueDateTime']=1
    
    try{
        // const task=await Task.find({owner:req.user._id});
        await req.user.populate({
            path: 'tasks',
            match,
            options:{
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks);
    }
    catch(error){
        res.status(500).send('1');
    } 
})


router.patch('/tasks/:id/completed',auth, async (req,res)=>{
    const _id=req.params.id;

    try{
        const task=await Task.findOne({_id: req.params.id,owner: req.user._id})

        if(!task){      
            return res.status(404).send();
        }

        task['completed']=true;
        task['overdue']=false;
        task['percentCompleted']=100
        task['status']='Completed'

        await task.save()

        res.send(task);
    }
    catch(e){
        res.status(400).send(e);
    }
})

router.patch('/tasks/:id', auth,async (req,res)=>{
    const _id=req.params.id;
    const updates=Object.keys(req.body);
    const allowedupdates=['description','notes','dueDateTime','percentCompleted','labels'];
    isValidUpdate=updates.every((update)=> allowedupdates.includes(update))

    if(!isValidUpdate){
        return res.status(400),send({error:'Invalid updates!'})
    }

    try{
        const task=await Task.findOne({_id: req.params.id,owner: req.user._id})

        if(!task){      
            return res.status(404).send();
        }

        updates.forEach((update)=>{
            task[update]=req.body[update]
        })
        task['overdue']=false;
        task['status']='Completed'

        if(task['percentCompleted']>99){
            task['completed']=true;
        }

        await task.save()

        res.send(task);
    }
    catch(e){
        res.status(400).send(e);
    }
})

router.delete('/tasks/:id', auth,async (req,res)=>{
    try{
        const task=await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id});

        if(!task)
        {
            res.status(404).send('Task not found')
        }

        res.send(task)
    }
    catch(e){
        res.status(500).send();
    }
})

module.exports=router;