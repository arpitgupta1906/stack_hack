import React, { Component } from 'react';
import './css/UserProfile.css'

class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.state={
            user:{
                email:"gupta.25@iitj.ac.in",
                name:"I am the world",
                tasksCompleted: 20,
                taskIncomplete: 10,
                numberOfTeams: 3
            }
        }
    }
    
    // componentDidMount(){
    //     let token=localStorage.getItem('token');
        
    //     const config = {
    //         headers: { Authorization: `Bearer ${token}` }
    //     };
    //     if(token){

    //         this.setState({
    //             isAuthenticated: true
    //         })
    //         axios.get('http://localhost:8080/users/me/',
    //         config
    //         ).then((res)=>{
    //             this.setState({
    //                 user:res.data
    //             })
    //             // console.log(res.data)
    //         }).catch((error)=>{
    //             console.log(error)
    //         })

    //     }
    // }

    render() {
        return (
            <div>
                <div class="card">
                <img
                // src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTTyARc8X4SVR0RjAtQwCQSF-BLf09GCwTfGWogH02zvfbDXlaU&usqp=CAU" 
                src="https://theimag.org/wp-content/uploads/2015/01/user-icon-png-person-user-profile-icon-20-400x400.png" 
                alt="John" className="imageclass" width="42" height="42" />
                <h1>{this.state.user.name}</h1>
                <p class="title">Active Member</p>
                <p>Tasks Completed: {this.state.user.tasksCompleted}</p>
                <p>Tasks InComplete: {this.state.user.taskIncomplete}</p>
                <p>Number of Teams: {this.state.user.numberOfTeams}</p>
                <p><button>{this.state.user.email}</button></p>
                </div>
            </div>
        );
    }
}

export default UserProfile;