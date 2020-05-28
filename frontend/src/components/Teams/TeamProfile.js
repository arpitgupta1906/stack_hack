import React, { Component } from 'react';
import '../css/AddTask.css'
import '../css/TeamProfile.css';
import axios from 'axios';

class TeamProfile extends Component {
    constructor(props) {
        super(props);
        
        this.state={
            team:{},
            members:[]
        }
    }

    componentDidMount(){
        const _ID=this.props.match.params.ID;
        
         let token=localStorage.getItem('token');
         const config = {
             headers: { Authorization: `Bearer ${token}` }
         };
         
         axios.get(`http://localhost:3000/team/${_ID}`,
         config).then((res)=>{

            this.setState({
                team:res.data
            }) 
            
         }).catch((error)=>{
             console.log(error)
         })   

        axios.get(`http://localhost:3000/team/${_ID}/members`,config).
        then((res)=>{
            this.setState({
                members:res.data
            })
        }).catch((e)=>{
            console.log(e);
        })
         
    }

    handleSubmit=(event)=>{
        const agenda=event.target.agenda.value;

        const _ID=this.props.match.params.ID;
        
         let token=localStorage.getItem('token');
         const config = {
             headers: { Authorization: `Bearer ${token}` }
         };
         
 
         axios.patch(`http://localhost:3000/team/${_ID}/updateagenda`,
         {
             agenda
         },
         config).then((res)=>{             
            //  console.log(res.data)
             window.location.reload();
         }).catch((error)=>{
             console.log(error)
         })
    }

    handleInvite=(event)=>{
         const _ID=this.props.match.params.ID;
        
         let token=localStorage.getItem('token');
         const config = {
             headers: { Authorization: `Bearer ${token}` }
         };
         
 
         axios.patch(`http://localhost:3000/team/${_ID}/changeinvite`,
         {},
         config).then((res)=>{             
             console.log(res.data.invitecode)
             window.location.reload();
         }).catch((error)=>{
             console.log(error)
         })
    }
    
    render() {

        const {team,members}=this.state
        const memberlist=this.state.members.map((member)=>{
            return <div>

            <p>{member.name}</p>
            </div>
        })

        console.log(memberlist)

        return (
            <div className="task">
                <form onSubmit={this.handleSubmit}>
                <header><p>Team Profile</p></header>

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
                <button type="submit" onClick={this.handleInvite} class="btn btn-warning">Change Invite Code</button>
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