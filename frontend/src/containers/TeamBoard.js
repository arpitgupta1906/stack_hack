import React, { Component } from 'react';
import SingleTask from '../components/Tasks/SingleTask';
import '../components/css/TeamBoard.css'
import axios from 'axios';

class TeamBoard extends Component {

    constructor(props) {
        super(props);
        this.state={
            tasks:[],
        }
    }

    componentDidMount(){
        const _ID=this.props.match.params.ID;
        let token=localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
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

        }
    }
    

    render() {

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
            <p>

            <div className="fit-menu">
            <button type="button"  class="btn btn-primary add-task">
                <a className="task-a" href="#">Add Task</a>
            </button>
            <button type="button"  class="btn btn-primary add-task">
                <a className="task-a" href="#">Team Profile</a>
            </button>
            <button type="button"  class="btn btn-primary add-task">
                <a className="task-a" href="#">Update Team</a>
            </button>
            <button type="button"  class="btn btn-primary add-task">
                <a className="task-a" href="#">Invite Members</a>
            </button>
            <button type="button"  class="btn btn-primary add-task">
                <a className="task-a" href="#">Leave Team</a>
            </button>
            </div>
            </p>
                {tasklist}
            </div>
        );
    }
}

export default TeamBoard;