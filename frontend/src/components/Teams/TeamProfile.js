import React, { Component } from 'react';
import '../css/AddTask.css'
import '../css/TeamProfile.css';

class TeamProfile extends Component {
    constructor(props) {
        super(props);
        
        this.state={
            team:{
                name:"this is the one",
                agenda:"please work",
                invitecode: 12323,
                members:[
                    'hello world',
                    'I am better',
                    'Sup?'
            ]
            }
        }
    }
    
    render() {

        const {team}=this.state
        const memberlist=team.members.map((member)=>{
            return <div>

            <p>{member}</p>
            </div>
        })

        return (
            <div className="task">
                <form onSubmit={this.handleSubmit}>
                <header><p>Create Team</p></header>

                <div class="form-group">
                    <label for="name">Team Name:</label>
                    <input name="name" class="form-control" value={team.name} id="name" readOnly />
                </div>

                <div class="form-group">
                    <label for="Agenda">Agenda:</label>
                    <input name="agenda" class="form-control" defaultValue={team.agenda} id="agenda" />
                </div>

                <div class="form-group">
                    <label for="Agenda">Invite Code:</label>
                    <input name="code" class="form-control" id="code" value={team.invitecode} readOnly />
                </div>
                
                <button type="submit" class="btn btn-primary">Update Agenda</button>
                </form>
                <button type="submit" class="btn btn-warning">Change Invite Code</button>
                <br />
                <br />
                <h3>Team Members:</h3>
                <div className="members">

                {memberlist}
                </div>
            
            </div>
        );
    }
}

export default TeamProfile;