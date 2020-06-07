import React, { Component } from 'react';
import '../css/AddTask.css'
import axios from 'axios';
import {withRouter} from 'react-router-dom';

////for team input,send team="team name as input" and id=team id


class AddTask extends Component {

    constructor(props) {
        super(props);
        this.state={
            defaultdate:new Date(),
            error:""
        }
    }
    

    handleSubmit=async (event)=>{
        event.preventDefault();
        const description=event.target.description.value;
        const notes=event.target.notes.value;
        const labels=event.target.labels.value;
        var duedatetime=event.target.duedatetime.value;
        const percentCompleted=event.target.percentCompleted.value;

        console.log(duedatetime)
        duedatetime=new Date(duedatetime).toISOString();

        let token=localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        try{

            const tasks=await axios.post('https://hashlist.herokuapp.com/tasks/add',{
                description,
                notes,
                labels,
                dueDateTime:duedatetime,
                percentCompleted
            }, config)
            this.props.history.push('/tasks/all');
            window.location.reload()
        }
        catch(e){
            this.setState({
                error:"Unable to create task, please try again"
            })
            // console.log(e);
        }

        // console.log(duedatetime);
    }

    render() {
        // const {team}=this.props;
    
        return (
            <div className="task">
                <form onSubmit={this.handleSubmit}>
                <header><p>Add Task</p></header>
                <div class="form-group">
                    <label for="description">Description:</label>
                    <input name="description" class="form-control" placeholder="Task Description" id="description" />
                </div>

                <div class="form-group">
                    <label for="name">Notes:</label>
                    <input name="notes" class="form-control" placeholder="Notes" id="notes" />
                </div>

                <div className="form-group">
                <label  for="duedatetime">Choose a time for your appointment:</label>
                <input className="form-control" type="datetime-local" id="duedatetime"
                name="duedatetime" defaultValue={this.state.defaultdate}
                min={Date.now()} />

                <label  for="labels">Add task label:</label>
                <select name="labels" defaultValue="Others">
                    <option name="Personal"> Personal</option>
                    <option name="Work"> Work</option>
                    <option name="Shopping"> Shopping</option>
                    <option name="Others"> Others</option>
                </select>
                </div>
                <div className="form-group">
                <label for="customRange3">Percentage Completed:</label>
                <input type="range"  className="form-control" defaultValue="0" class="custom-range" name="percentCompleted" min="0" max="100" step="1" id="customRange3" />
                </div>
                <button type="submit" class="btn btn-primary join">+ Add Task</button>
                </form>
                {this.state.error? 
                <span className="error"> 
                {this.state.error}
                </span>
                :""
                }
            </div>
        );
    }
}

export default withRouter(AddTask);