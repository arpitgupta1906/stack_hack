import React, { Component } from 'react';
import '../css/UserProfile.css'
import axios from 'axios';
class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.state={
            user:{}
        }
    }
    
    componentDidMount(){
        let token=localStorage.getItem('token');
        
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        if(token){

            this.setState({
                isAuthenticated: true
            })
            axios.get('https://hashlist.herokuapp.com/users/profile/',
            config
            ).then((res)=>{
                this.setState({
                    user:res.data
                })
                // console.log(res.data)
            }).catch((error)=>{
                console.log(error)
            })

        }
    }

    render() {
        const teams=this.state.user.teams
       
        return (
            <div>
                <div class="card">
                <img
                // src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTTyARc8X4SVR0RjAtQwCQSF-BLf09GCwTfGWogH02zvfbDXlaU&usqp=CAU" 
                src="https://theimag.org/wp-content/uploads/2015/01/user-icon-png-person-user-profile-icon-20-400x400.png" 
                alt="John" className="imageclass" width="42" height="42" />
                <h1>{this.state.user.name}</h1>
                <p class="title">Active Member</p>
                {/* <p>Tasks Completed: {this.state.user.tasksCompleted}</p> */}
                {/* <p>Tasks InComplete: {this.state.user.taskIncomplete}</p>*/}
                {
                    teams?
                <p>Number of Teams: {teams.length}</p> 
                    :""
                }
                <p><button>{this.state.user.email}</button></p>
                </div>
                <button type="button"  class="btn btn-primary update-button">
                <a className="" href={`/update`}>Update</a>
                </button>
            </div>
        );
    }
}

export default UserProfile;