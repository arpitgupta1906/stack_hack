import React, { Component } from 'react';
import '../css/AddTask.css'
import axios from 'axios';
class Invite extends Component {

    handleSubmit=(event)=>{
        const email=event.target.email.value;
        // console.log(email)
        const _ID=this.props.match.params.ID;
        

        let token=localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        axios.post(`http://localhost:3000/team/${_ID}/invite`,
        {
            email
        },
        config).then((res)=>{
            // this.props.history.push('/')
            console.log('done')
            this.forceUpdate();
        }).catch((error)=>{
            console.log(error)
        })
    }

    render() {
        return (
            <div className="task">
                <form onSubmit={this.handleSubmit}>
                <header><p>Add Member</p></header>

                <div class="form-group">
                    <label for="email">User Email:</label>
                    <input type="email" name="email" class="form-control" placeholder="email" id="email" />
                </div>


                <button type="submit" class="btn btn-primary">Add Member</button>
                </form>

            </div>
        );
    }
}

export default Invite;