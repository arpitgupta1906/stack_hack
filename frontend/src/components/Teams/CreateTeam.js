import React, { Component } from 'react';
import '../css/AddTask.css'

class CreateTeam extends Component {

    handleSubmit=(event)=>{
        event.preventDefault();
        const name=event.target.name.value;
        const agenda=event.target.agenda.value;

        console.log(name);
    }


    render() {
        return (
            <div className="task">
                <form onSubmit={this.handleSubmit}>
                <header><p>Create Team</p></header>

                <div class="form-group">
                    <label for="name">Team Name:</label>
                    <input name="name" class="form-control" placeholder="Team Name" id="name" />
                </div>

                <div class="form-group">
                    <label for="Agenda">Agenda:</label>
                    <input name="agenda" class="form-control" placeholder="Add agenda" id="agenda" />
                </div>

                <button type="submit" class="btn btn-primary">Add Task</button>
                </form>

            </div>
        );
    }
}

export default CreateTeam;