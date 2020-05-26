const express=require('express')
const User=require('../models/user')
const auth=require('../middleware/auth')
const multer=require('multer')
const router=new express.Router()
const sharp=require('sharp')
const Task=require('../models/task')
const {authorization}=require('../emails/accounts')
const nodemailer=require('nodemailer')

//Add notes

router.post('/users/signup',async (req,res)=>{
    const user=new User(req.body)

    try{
        

        const transporter=nodemailer.createTransport(authorization);

        const mailOptions={
            from: 'gupta.arpit5694@gmail.com',
            to: user.email,
            subject:'Welcome Message',
            text: `Welcome ${user.name}
                Get more done everyday`
        }


        transporter.sendMail(mailOptions, (error, info)=>{
            if (error) {
                console.log(error);
            //    return res.status(404).send()
            } else {
            console.log('Email sent: ' + info.response);
            }
        });

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

router.patch('/resetpassword', async(req,res)=>{
    const {email}=req.body;

    try{
        const user=await User.findOne({email});

        if(!user){
            res.status(404).send()
        }
        const transporter=nodemailer.createTransport(authorization);

        user.resetcode=Math.floor(Math.random()*100000);
        // console.log(user)
        await user.save();

        const mailOptions={
            from: 'gupta.arpit5694@gmail.com',
            to: user.email,
            subject:'Reset Password',
            text: `Your password reset code is: ${user.resetcode}`
        }

        transporter.sendMail(mailOptions, (error, info)=>{
            if (error) {
                console.log(error);
            //    return res.status(404).send()
            } else {
            console.log('Email sent: ' + info.response);
            }
        });

        res.status(200).send(user);
    }
    catch(e){
        res.status(400).send(e);
    }
})

router.post('/resetcode/:id',async (req,res)=>{
    const {resetcode,password}=req.body;
    const id=req.params.id
    
    try{
        const user=await User.findOne({_id:id,resetcode:resetcode})
        if(!user){
            return res.status(404).send()
        }
        
        user['password']=password
        // res.status(200).send(user)
        delete user.resetcode
        await user.save()
        return res.status(200).send(user);
    }
    catch(e){
        res.status(400).send()
    }
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

router.get('/users/teams', auth,async (req,res)=>{
    try{
        const teams=await req.user.populate("teams").execPopulate()
        // console.log(teams.teams)
        res.status(200).send(teams.teams)
    }
    catch(e){
        res.status(400).send(e);
    }
})


router.get('/users/freshstart',auth,async (req,res)=>{
    const user=await User.findById(req.user)

    try{
        await Task.deleteMany({owner: user._id,team: undefined})
        res.status(200).send()
    }
    catch(e){
        res.status(400).send(e);
    }

})

module.exports=router;