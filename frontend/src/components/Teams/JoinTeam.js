import React, { Component } from 'react';
import '../css/AddTask.css'

class JoinTeam extends Component {

    handleSubmit=(event)=>{
        event.preventDefault();
        const name=event.target.name.value;
        const code=event.target.code.value;

        console.log(code);
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
                    <label for="Agenda">Invite Code:</label>
                    <input name="code" class="form-control" placeholder="Enter Invite Code" id="code" />
                </div>

                <button type="submit" class="btn btn-primary">Join Team</button>
                </form>

            </div>
        );
    }
}

export default JoinTeam;