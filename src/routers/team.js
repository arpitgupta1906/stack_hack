const express=require('express')
const Team=require('../models/team')
const router=new express.Router()
const auth=require('../middleware/auth')



//join team
// add members
//change invite link
// get team members
//post task to team
// get tasks
// update agenda
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
        res.status(500).send();
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

// router.get('/:name/members', auth, async (req,res)=>{

// })

module.exports=router;