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

        let token=localStorage.getItem('token');
        if(!token){
            this.props.history.push('/home');
        }
        const _ID=this.props.match.params.LABEL;
        // console.log(_ID)
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        if(token){

            this.setState({
                isAuthenticated: true
            })
            let url;
            if(_ID==='all' || !_ID){
                url='https://hashlist.herokuapp.com/tasks?completed=false&sortBy=completed:asc'
            }
            else if(_ID==='archived'){
                url='https://hashlist.herokuapp.com/tasks?completed=true&&sortBy=dueDateTime:desc'
            }
            else if(_ID==='overdue'){
                url='https://hashlist.herokuapp.com/overdue'
            }
            else{    
            url=`https://hashlist.herokuapp.com/tasks?labels=${_ID}&completed=false`
            }

            axios.get(url,
            config
            ).then((res)=>{
                this.setState({
                    tasks:res.data
                })
                // console.log(res.data)
            }).catch((error)=>{
                // alert(error)
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
            {tasklist.length>0?
            <ul className="list-group">
                {tasklist}
            </ul>
            :<h4 class="notask"> No Tasks Yet</h4>
            }
            </span>
            :
            <div> Unauthorized Access</div>
            }
            </div>
        );
    }
}

export default withRouter(TasksList);