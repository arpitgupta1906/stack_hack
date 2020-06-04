import React, { Component } from 'react';
import '../css/AddTask.css'
import axios from 'axios';
import {withRouter} from 'react-router-dom';


class JoinTeam extends Component {

    constructor(props) {
        super(props);
        this.state={
            error:""
        }
    }
    

    handleSubmit=(event)=>{
        event.preventDefault();
        const name=event.target.name.value;
        const code=event.target.code.value;

        // const _ID=this.props.match.params.ID;
        

        let token=localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        

        axios.post(`https://hashlist.herokuapp.com/jointeam`,
        {
            name,
            invitecode: parseInt(code)
        },
        config).then((res)=>{
            this.props.history.push(`/team/${res.data._id}`)
            window.location.reload();
            // console.log(res.data)
        }).catch((e)=>{
            this.setState({
                error:"*Invalid team name or password"
            })
            console.log(e)
        })


        console.log(code);
    }

    render() {
        return (
            <div className="task">
                <form onSubmit={this.handleSubmit}>
                <header><p>Join Team</p></header>

                <div class="form-group">
                    <label for="name">Team Name:</label>
                    <input name="name" class="form-control" placeholder="Team Name" id="name" />
                </div>

                <div class="form-group">
                    <label for="Agenda">Invite Code:</label>
                    <input name="code" class="form-control" placeholder="Enter Invite Code" id="code" />
                </div>

                <button type="submit" class="btn btn-primary join">Join Team</button>
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

export default withRouter(JoinTeam);