const express=require('express')
const Team=require('../models/team')
const router=new express.Router()
const auth=require('../middleware/auth')
const Task=require('../models/task')

//send invite
// leave team 

router.post('/createteam', auth, async (req,res)=>{
    const user=req.user 

    const team=new Team({
        ...req.body,
        creator: user._id,
        invitecode: Math.floor(Math.random()*100000)
    })
    try{
        team.members.push(user._id)
        await team.save()
        user.teams.push(team._id)
        await user.save()
        res.status(200).send(team)
        
    }
    catch(e){
        res.status(500).send(e);
    }

})

router.post('/jointeam', auth,async (req,res)=>{
    const {name,invitecode}=req.body 
    try{

        if(name){
            const team=await Team.findOne({name})
    
            if(!team){
                return res.status(404).send()
            }
            
            if(team.invitecode!==invitecode){
                return res.status(401).send()
            }

            for(let i=0;i<team.members.length;i++){
                s=team.members[i].toString();
                if(!s.localeCompare(req.user._id)){
                    return res.status(200).send(team);
                }
            }

            team.members.push(req.user._id)
            await team.save();

            req.user.teams.push(team._id)
            await req.user.save()

            res.status(200).send(team)
        }
    }
    catch(e){
        res.status(500).send(e);
    }

})

router.post('/team/:id/task', auth,async (req,res)=>{
    try{
        const team=await Team.findOne({_id:req.params.id})

        if(!team){
            return res.status(404).send();
        }

        const task=new Task({
            ...req.body,
            owner: req.user._id,
            team: team._id
        })

        await task.save()
        res.status(201).send(task)

    }
    catch(e){
        res.status(400).send(e);
    }
})

router.get('/team/:id/members', auth,async (req,res)=>{
    try{
        const team=await Team.findOne({_id:req.params.id})

        if(!team){
            return res.status(404).send();
        }

        team.populate("members").execPopulate().then((document)=>{
            res.status(200).send(document.members)
        })
        
    }
    catch(e){
        res.status(400).send(e);
    }
})


router.get('/team/:id/tasks', auth,async (req,res)=>{

    
    const match={}
    const sort={}

    if(req.query.completed){
        match.completed=req.query.completed==='true'
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

    if(req.query.sortBy){
        const parts=req.query.sortBy.split(':')
        sort[parts[0]]=parts[1]==='desc'?-1:1
    }

    try{

        const team=await Team.findOne({_id:req.params.id})

        if(!team){
            return res.status(404).send();
        }

        await team.populate({
            path: 'tasks',
            match,
            options:{
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(team.tasks);
    }
    catch(error){
        res.status(500).send(error);
    }
    
})


router.post('/searchteam', auth,async (req,res)=>{
    const name=req.body.name
    try{

        if(name){
            const team=await Team.findOne({name})
    
            if(!team){
                return res.status(404).send()
            }
    
            res.status(200).send(team)
        }
    }
    catch(e){
        res.status(500).send();
    }

})

router.patch('/team/:id/updateagenda', auth,async (req,res)=>{
    
    try{
        const team=await Team.findOne({_id:req.params.id})
        if(!team){
            return res.status(404).send();
        }
        
        team['agenda']=req.body.agenda;

        // console.log(team)
        await team.save()

        res.status(200).send(team)
    }
    catch(e){
        res.status(400).send(e);
    }
})

router.patch('/team/:id/changeinvite', auth,async (req,res)=>{
    
    try{

        const team=await Team.findOne({_id:req.params.id})
        if(!team){
            return res.status(404).send();
        }
        
        team['invitecode']=Math.floor(Math.random()*100000);
        // console.log(team)
        await team.save()

        res.status(200).send(team)
    }
    catch(e){
        res.status(400).send(e);
    }
})


module.exports=router;