const nodemailer=require('nodemailer')

// const transporter=nodemailer.createTransport({
//     // host: 'smtp.mailtrap.io',
//     // port: 2525,
//     service: 'gmail',
//     auth: {
//        user: 'gupta.arpit5694@gmail.com',
//        pass: '1Wrld@PC'
//     }
// });


// const mailOptions={
//     from: 'gupta.arpit5694@gmail.com',
//     to: 'gupta.25@iitj.ac.in',
//     subject:'Sending First Email',
//     text: 'That was not easy'
// }

// transporter.sendMail(mailOptions, (error, info)=>{
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Email sent: ' + info.response);
//     }
//   });

const authorization={
    service: 'gmail',
    auth: {
       user: 'gupta.arpit5694@gmail.com',
       pass: '1Wrld@PC'
    }
}

  module.exports={
      authorization
  }