const express=require('express');
require('./db/mongoose')
const userRouter=require('./routers/user')
const taskRouter=require('./routers/task')
const teamRouter=require('./routers/team')
const cors=require('cors')
const http=require('http')
const path=require('path');
const app=express();
const server=http.createServer(app);

const PORT=process.env.PORT || 8080;

app.use(cors());
app.options('*',cors());
app.use(express.json());

// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static('frontend/build'));
// }

app.use(userRouter)
app.use(taskRouter)
app.use(teamRouter)

require('./middleware/checkDueDate')


// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
// });

server.listen(PORT,()=>{
    console.log("server is up on port",PORT);
})

