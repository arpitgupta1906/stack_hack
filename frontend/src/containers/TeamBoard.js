import React, { Component } from 'react';
import SingleTask from '../components/Tasks/SingleTask';
import '../components/css/TeamBoard.css'
import axios from 'axios';
import {withRouter} from 'react-router-dom';


class TeamBoard extends Component {

    constructor(props) {
        super(props);
        this.state={
            tasks:[],
            teamname:""
        }
    }

    componentDidMount(){
        const _ID=this.props.match.params.ID;
        let token=localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        if(!token){
            this.props.history.push('/login')
        }
        if(token){

            axios.get(`http://localhost:3000/team/${_ID}/tasks`,
            config
            ).then((res)=>{
                this.setState({
                    tasks:res.data
                })

            }).catch((error)=>{
                console.log(error)
            })
                     
            axios.get(`http://localhost:3000/team/${_ID}`,
            config
            ).then((res)=>{
                this.setState({
                    teamname:res.data.name
                })
            }).catch((error)=>{
                console.log(error)
            })

        }
    }
    
    handleleave=(event)=>{
        const _ID=this.props.match.params.ID;
        let token=localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        if(token){

            axios.get(`http://localhost:3000/team/${_ID}/leaveteam`,
            config
            ).then((res)=>{
            this.props.history.push('/tasks/all')
            window.location.reload();

            }).catch((error)=>{
                console.log(error)
            })

        }
    }

    render() {
        const _ID=this.props.match.params.ID;
        const {tasks}=this.state 

        console.log(tasks)
        const tasklist=tasks.map((task)=>{
            return (
                <div>
                    <SingleTask task={task} />
                </div>
            )
        })

        return (
            <div>
            <h3>{this.state.teamname}</h3>
            <p>

            <div className="fit-menu">
            <button type="button"  class="btn btn-primary add-task">
                <a className="task-a" href={`/team/${_ID}/addtask`}>Add Task</a>
            </button>
            <button type="button"  class="btn btn-primary add-task">
                <a className="task-a" href={`/team/${_ID}/profile`}>Team Profile</a>
            </button>
            <button type="button"  class="btn btn-primary add-task">
                <a className="task-a" href={`/team/${_ID}/invite`}>Invite Members</a>
            </button>
            <button type="button" onClick={this.handleleave} class="btn btn-primary add-task">
                <a className="task-a" href="#">Leave Team</a>
            </button>
            </div>
            </p>
                {tasklist}
            </div>
        );
    }
}

export default withRouter(TeamBoard);