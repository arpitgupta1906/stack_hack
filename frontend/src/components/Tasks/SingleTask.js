import React, { Component } from 'react';
import '../css/SingleTask.css'
import Moment from 'react-moment';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class SingleTask extends Component {

    constructor(props) {
        super(props);
        this.state={
            team:""
        }
    }
    
   
    markasdone=async (event)=>{
        // event.preventDefault();

        const _ID=this.props.task._id;
        // console.log(_ID)

        let token=localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        
        try{
            const res=await axios.patch(`https://hashlist.herokuapp.com/tasks/${_ID}/completed`,{},config)
            // console.log("Done")
            window.location.reload();
        }
        catch(e){
            console.log(e)
        }
    }

    ondelete=async (event)=>{
        const _ID=this.props.task._id;

        let token=localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        try{
            const res=await axios.delete(`https://hashlist.herokuapp.com/tasks/${_ID}`,config)
            // console.log("deleted")
            // this.props.history.push('/tasks')
            window.location.reload();
        }
        catch(e){
            console.log(e)
        }

    }

    handlePercent=(event)=>{
        event.preventDefault();
        const percentCompleted=event.target.value;
        const _ID=this.props.task._id;
        let token=localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        axios.patch(`https://hashlist.herokuapp.com/tasks/${_ID}`,
        {
            percentCompleted:percentCompleted
        },
        config).then((res)=>{
            console.log('done')
        }).catch((error)=>{
            console.log(error)
        })

        console.log(percentCompleted);
        
    }

    componentDidMount(){
        let {task}=this.props
        
        if(task.team){
            
            const _ID=this.props.task.team;
            let token=localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };            
            axios.get(`https://hashlist.herokuapp.com/team/${_ID}`,
            config
            ).then((res)=>{
                this.setState({
                    team:res.data.name
                })
            }).catch((error)=>{
                console.log(error)
            })
        }

    }

    render() {
        let {task}=this.props
        // console.log(task.dueDateTime,task.description)
        task.dueDateTime=new Date(task.dueDateTime)

        return (
            <div className="singletask" id="stask">

            <li className="list-group-item">
                <p> <span className="test1"><Moment format="D-ddd MMMM-YY HH:mm a">{task.dueDateTime}</Moment></span>
                 <span className="test2">
                 <a href={`/tasks/${task.labels}`}>
                 {task.labels}
                 </a>
                 </span>
                {
                    task.completed?
                <span className="test3">
                <a href="/tasks/archived">
                    Completed
                </a>
                </span> 
                    :
                    <span className="test5">
                    Incomplete
                    </span>
                }
                
                {
                    task.overdue? 
                <span className="test4">
                <a href="/tasks/overdue">
                Overdue
                </a>
                </span>
                : ""
                }
                 </p>
                
                <p className="content">{task.description}</p>
                <p className="content">{task.notes}</p>
                {
                    this.state.team.length>0?
                <p className="content">Team:  {this.state.team}</p>
                :""
                }
                <p>
                    
                <label for="customRange3">Percentage Completed: </label>
                <input type="range" onChange={this.handlePercent} defaultValue={task.percentCompleted} class="custom-range" name="percentCompleted" min="0" max="100" step="1" id="percentCompleted" />

                </p>

                <p className="content">
                {
                    !task.completed?
                    <button type="button" onClick={this.markasdone} class="btn btn-success task-button">
                    Done?
                    </button>
                    :""
                }

                <button type="button"  class="btn btn-primary task-button">
                <a className="task-a update-please" href={`/${this.props.task._id}/update`}>Update</a>
                </button>

                <button type="button" onClick={this.ondelete} class="btn btn-danger task-button">
                Delete
                </button>
                </p>
            </li>
            </div>
        );
    }
}

export default withRouter(SingleTask);



//////for update, href=`{/${task._id}/update}`