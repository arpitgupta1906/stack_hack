const express=require('express');
require('./db/mongoose')
const userRouter=require('./routers/user')
const taskRouter=require('./routers/task')
const teamRouter=require('./routers/team')
const cors=require('cors')
const http=require('http')

const app=express();
const server=http.createServer(app);

const PORT=process.env.PORT || 8080;

app.use(cors());
app.options('*',cors());
app.use(express.json());

app.use(userRouter)
app.use(taskRouter)
app.use(teamRouter)

require('./middleware/checkDueDate')

server.listen(PORT,()=>{
    console.log("server is up on port",PORT);
})


