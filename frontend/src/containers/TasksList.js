import React, { Component } from 'react';
import SingleTask from '../components/Tasks/SingleTask';
import '../components/css/TeamBoard.css';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

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
        if(!token){
            this.props.history.push('/');
        }
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        if(token){

            this.setState({
                isAuthenticated: true
            })
            let url;
            if(_ID==='all' || !_ID){
                url='http://localhost:3000/tasks?sortBy=completed:asc'
            }
            else if(_ID==='archived'){
                url='http://localhost:3000/tasks?completed=true&&sortBy=completed:asc'
            }
            else if(_ID==='overdue'){
                url='http://localhost:3000/overdue'
            }
            else{    
            url=`http://localhost:3000/tasks?labels=${_ID}&sortBy=completed:asc`
            }

            axios.get(url,
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
            {this.state.isAuthenticated?
            <span>

             <button type="button" class="btn btn-primary add-task-main">
                <a className="task-a" href="/addtask">Add Task</a>
            </button>
            <ul className="list-group">
                {tasklist}
            </ul>
            </span>
            :
            <div> Unauthorized Access</div>
            }
            </div>
        );
    }
}

export default withRouter(TasksList);