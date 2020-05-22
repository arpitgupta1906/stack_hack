const express=require('express')
const User=require('../models/user')
const auth=require('../middleware/auth')
const multer=require('multer')
const router=new express.Router()
const sharp=require('sharp')


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


module.exports=router;