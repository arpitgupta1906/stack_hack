import React, { Component } from 'react';
import '../css/AddTask.css'
import axios from 'axios';
import {withRouter} from 'react-router-dom';


class CreateTeam extends Component {

    constructor(props) {
        super(props);
        this.state={
            error:""
        }
    }
    

    handleSubmit=(event)=>{
        event.preventDefault();
        const name=event.target.name.value;
        const agenda=event.target.agenda.value;

        let token=localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        

        axios.post(`https://hashlist.herokuapp.com/createteam`,
        {
            name,
            agenda
        },
        config).then((res)=>{
            this.props.history.push(`/team/${res.data._id}`)
            window.location.reload();
        }).catch((error)=>{
            this.setState({
                error:"A team with the same name already exists"
            })
            // console.log(error)
        })

        // console.log(name);
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

                <button type="submit" class="btn btn-primary join">Create</button>
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

export default withRouter(CreateTeam);