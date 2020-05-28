import React, { Component } from 'react';
import SingleTask from '../components/Tasks/SingleTask';
import '../components/css/TeamBoard.css';
import axios from 'axios';

class TasksList extends Component {
    constructor(props) {
        super(props);
        this.state={
            tasks:[],
            isAuthenticated: false
        }
    }

    componentDidMount(){

        const _ID=this.props.match.params.LABEL;
        console.log(_ID)
        let token=localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        if(token){

            this.setState({
                isAuthenticated: true
            })
            axios.get('http://localhost:3000/tasks?sortBy=completed:asc',
            config
            ).then((res)=>{
                this.setState({
                    tasks:res.data
                })
                // console.log(res.data)
            }).catch((error)=>{
                console.log(error)
            })

        }
    }
    
    render() {
        const {tasks}=this.state 

        // console.log(tasks)
        const tasklist=tasks.map((task)=>{
            return (
                <div>
                    <SingleTask task={task} />
                </div>
            )
        })
        return (
            <div>
             <button type="button"  class="btn btn-primary add-task-main">
                <a className="task-a" href="#">Add Task</a>
            </button>
            <ul className="list-group">
                {tasklist}
            </ul>
            </div>
        );
    }
}

export default TasksList;