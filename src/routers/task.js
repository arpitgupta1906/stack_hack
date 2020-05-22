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

module.exports=router;