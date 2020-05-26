import React, { Component } from 'react';
import '../css/AddTask.css'


////for team input,send team="team name as input" and id=team id


class AddTask extends Component {

    handleSubmit=(event)=>{
        event.preventDefault();
        const description=event.target.description.value;
        const notes=event.target.notes.value;
        const labels=event.target.labels.value;
        const duedatetime=event.target.duedatetime.value;
        const percentCompleted=event.target.percentCompleted.value;

        console.log(percentCompleted);
    }

    render() {
        const {team}=this.props;
        console.log(team)
        return (
            <div className="task">
                <form onSubmit={this.handleSubmit}>
                <header><p>Add Task</p></header>
                {
                    team.length>0?

                <div class="form-group">
                    <label for="team">Team:</label>
                    <input type="name"   class="form-control" value={team} id="team" readOnly />
                </div>
                    :
                    ""
                }
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
                name="duedatetime"  defaultValue={Date.now()}
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
                <button type="submit" class="btn btn-primary">Add Task</button>
                </form>

            </div>
        );
    }
}

export default AddTask;