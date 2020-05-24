const {authorization}=require('./accounts')
const nodemailer=require('nodemailer')

// console.log(authorization)

// const authorizations={
//     service: 'gmail',
//     auth: {
//         user: 'gupta.arpit5694@gmail.com',
//         pass: '1Wrld@PC'
//     }
// }
// console.log(authorizations)

user={
    email:"gupta.25@iitj.ac.in"
}



const transporter=nodemailer.createTransport(authorization);

const mailOptions={
    from: 'gupta.arpit5694@gmail.com',
    to: user.email,
    subject:'Welcome Message',
    text: 'Welcome, Do more every day'
}

// console.log(transporter.sendMail)

transporter.sendMail(mailOptions, (error, info)=>{
    if (error) {
        console.log(error);
    //    return res.status(404).send()
    } else {
      console.log('Email sent: ' + info.response);
    }
  });