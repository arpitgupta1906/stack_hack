const express=require('express')
const User=require('../models/user')
const auth=require('../middleware/auth')
const multer=require('multer')
const router=new express.Router()
const sharp=require('sharp')
const Task=require('../models/task')

router.post('/users/signup',async (req,res)=>{
    const user=new User(req.body)

    try{
        await user.save()
        const token=await user.generateAuthToken()

        //we are sending token to be used by postman
        res.status(201).send({user,token});

    }
    catch(e){
        res.status(400).send(e);
    }
})

router.post('/test',async (req,res)=>{
    const input=req.body 

    try{
        res.status(201).send(input);
    }
    catch(e){
        res.status(400).send(e);
        }
})

router.post('/users/login',async (req,res)=>{
    try{
        const user=await User.findByCredentials(req.body.email,req.body.password)
        const token=await user.generateAuthToken()
        res.send({user,token})
    }
    catch(e){
        res.status(400).send()
    }
})

router.post('/users/logout', auth,async (req,res)=>{
    try{
        // res.send(req.user.tokens)
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token!==req.token
        })

        await req.user.save()
        res.send('done')

    }catch(e){
        res.status(500).send()
    }
})


router.post('/users/logoutAll',auth,async (req,res)=>{
    try{
        req.user.tokens=[]
        await req.user.save()
        res.send()
    }
    catch(e){
        res.status(500).send()
    }
})

router.get('/users/profile', auth,async (req,res)=>{

    res.send(req.user)

})

router.patch('/users/update',auth,async(req,res)=>{
    const updates=Object.keys(req.body);
    const allowedupdates=['name','email','password'];
    isValidUpdate=updates.every((update)=> allowedupdates.includes(update))

    if(!isValidUpdate){
        return res.status(400),send({error:'Invalid updates!'})
    }

    try{

        const user=await User.findById(req.user)
        // const user=req.user 

        updates.forEach((update)=>{
            user[update]=req.body[update]
        })

        await user.save()
        // user=await User.findByIdAndUpdate(_id,req.body,{
        //     new: true,runValidators:true
        // })

        res.send(user);
    }
    catch(e){
        res.status(400).send(e);
    }
})

// router.get('/users/freshstart',auth,async (req,res)=>{
//     const user=await User.findById(req.user)

//     try{
//         await Task.deleteMany({owner: user._id})
//         res.status(200).send()
//     }
//     catch(e){
//         res.status(400).send(e);
//     }

// })

module.exports=router;