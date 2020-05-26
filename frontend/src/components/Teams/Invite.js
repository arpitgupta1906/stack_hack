import React, { Component } from 'react';
import '../css/AddTask.css'

class Invite extends Component {

    handleSubmit=(event)=>{
        const email=event.target.email.value;
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