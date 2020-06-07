import React, { Component } from 'react';
import '../css/AddTask.css'
import axios from 'axios';

class EditTask extends Component {

    constructor(props) {
        super(props);
        
        this.state={
            task:{}
        }
        
    }
    
    componentDidMount(){
        const _ID=this.props.match.params.ID;
        // console.log(_ID)
        let token=localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        if(token){

            axios.get(`https://hashlist.herokuapp.com/tasks/${_ID}`,
            config
            ).then((res)=>{
                this.setState({
                    task:res.data
                })

                console.log(this.state)
                const d=this.state.duedatetime;
                d=new Date(d);

                // this.setState({
                //     task:{
                //         duedatetime:d
                //     }
                // })
                // console.log(res.data)
            }).catch((error)=>{
                console.log(error)
            })

        }
    }

    handleSubmit=(event)=>{
        event.preventDefault();
        const _ID=this.props.match.params.ID;
        const description=event.target.description.value;
        const notes=event.target.notes.value;
        const labels=event.target.labels.value;
        const duedatetime=event.target.duedatetime.value;
        const percentCompleted=event.target.percentCompleted.value;

        let data={};
        data['description']=description;
        data['notes']=notes;
        data['labels']=labels;
        data['dueDateTime']=new Date(duedatetime).toUTCString();
        data['percentCompleted']=percentCompleted;

        let token=localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        axios.patch(`https://hashlist.herokuapp.com/tasks/${_ID}`,
        data,
        config).then((res)=>{
            this.props.history.push('/tasks/all')
            console.log('done')
            this.forceUpdate();
        }).catch((error)=>{
            console.log(error)
        })

        // console.log(percentCompleted);
    }


    render() {
        const {task}=this.state;
        // console.log(this.state.task.team)
        if(this.state.task.team){
            const _ID=this.state.task._id
            // console.log(_ID)
            let token=localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };            
            axios.get(`https://hashlist.herokuapp.com/team/${_ID}`,
            config
            ).then((res)=>{
                task.teamname= res.data.name;
            }).catch((error)=>{
                console.log(error)
            })
        }

        console.log(task)
        return (
            <div className="task">
                <form onSubmit={this.handleSubmit}>
                <header><p>Add Task</p></header>
                
                {
                    task.teamname?

                <div class="form-group">
                    <label for="team">Team:</label>
                    <input type="name"   class="form-control" value={task.teamname} id="team" readOnly />
                </div>
                    :
                    ""
                }

                <div class="form-group">
                    <label for="description">Description:</label>
                    <input name="description" class="form-control" defaultValue={task.description} placeholder="Task Description" id="description" />
                </div>

                <div class="form-group">
                    <label for="name">Notes:</label>
                    <input name="notes" class="form-control" placeholder="Notes" defaultValue={task.notes} id="notes" />
                </div>

                <div className="form-group">
                <label  for="duedatetime">Choose a time for your appointment:</label>
                <input className="form-control" type="datetime-local" id="duedatetime"
                name="duedatetime"  defaultValue={this.state.task.dueDateTime}
                 />

                <label  for="labels">Add task label:</label>
                <select name="labels" defaultValue={this.state.task.labels}>
                <option value={this.state.task.labels} selected disabled hidden> 
                    {this.state.task.labels}
                </option> 
                    <option name="Personal"> Personal</option>
                    <option name="Work"> Work</option>
                    <option name="Shopping"> Shopping</option>
                    <option name="Others"> Others</option>
                </select>
                </div>
                <div className="form-group">
                <label for="customRange3">Percentage Completed:</label>
                <input type="range"  className="form-control" defaultValue={task.percentCompleted} defaultValue={task.percentCompleted} class="custom-range" name="percentCompleted" min="0" max="100" step="1" id="customRange3" />
                </div>
                <button type="submit" class="btn btn-primary">Add Task</button>
                </form>

            </div>
        );
    }
}

export default EditTask;