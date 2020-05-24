const Task=require('../models/task');
const User=require('../models/user')
const nodemailer=require('nodemailer')
const {authorization}=require('../emails/accounts')


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
              const id=r['owner']
              r.save()  

            if(r.team){
                Team.findOne({_id:req.params.id}).then((team)=>{
                    team.populate("members").execPopulate().then((document)=>{
                        document.members.map((member)=>{
                            const transporter=nodemailer.createTransport(authorization);

                    const mailOptions={
                        from: 'gupta.arpit5694@gmail.com',
                        to: member.email,
                        subject:`'${team.name} Task Overdue'`,
                        text: `Hi ${guy.name},
                            Your team task: ${r.description} is overdue,
                            would you like to reschedule?`
                    }
                    
                    transporter.sendMail(mailOptions, (error, info)=>{
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                        });



                        })
                    })
                })
            } 
            else{

                User.findOne({_id:id}).then((guy)=>{
                      
                const transporter=nodemailer.createTransport(authorization);
    
                const mailOptions={
                    from: 'gupta.arpit5694@gmail.com',
                    to: guy.email,
                    subject:'Task Overdue',
                    text: `Hi ${guy.name},
                        Your task: ${r.description} is overdue,
                        would you like to reschedule?`
                }
                
                transporter.sendMail(mailOptions, (error, info)=>{
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                    });
    
                  }) 
            }

              console.log(r.description)
            })
        }).catch((e)=>{
            console.log(e);
        })
        


    // return console.log('checking...');
}, 3000);

module.exports=checkDueDate;
