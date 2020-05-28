import React, { Component } from 'react';
import './Layout.css';
import axios from 'axios';
import Home from './Home';
import {Link,withRouter} from 'react-router-dom';

class Layout extends Component {

    constructor(props) {
        super(props);
        this.state={
            isAuthenticated: false
        }

    }
    
    componentDidMount(){
        
        if(localStorage.getItem('token')){
            this.setState({
                isAuthenticated:true,
                teams:[],
                user:JSON.parse(localStorage.getItem('user')).name
            })

            // console.log(this.state.user)
;

            let token=localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            axios.get('http://localhost:3000/users/teams',
            config
            ).then((res)=>{
                this.setState({
                    teams:res.data
                })
                // console.log(this.state.teams)
            }).catch((error)=>{
                console.log(error)
            })

        }
    }

    clickLogout=(event)=>{
        let token=localStorage.getItem('token')
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        
        axios.post('http://localhost:8080/users/logout',
        {
            token
        },
        config
        ).then((res)=>{
            this.setState({
                isAuthenticated:false
            })
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.props.history.push('/');
        }).catch((error)=>{
            console.log(error);
        })
    }

    clickreset=(event)=>{
        let token=localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        axios.get('http://localhost:3000/users/freshstart',
            config
            ).then((res)=>{
                console.log("all tasks deleted")
                this.props.history.push('/');
            }).catch((error)=>{
                console.log(error)
            })
    }

    render() {
        let teamlist
        if(this.state.isAuthenticated){
            teamlist=this.state.teams.map((team)=>{
                return <a href={`/team/${team._id}`}>{team.name}</a>
            })
        }

        return (
            <div>
                <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                    <a className="navbar-brand" href="#">ToDoIst</a>
                    </li>
                    <li className="nav-item">
                    <a className="navbar-brand" href="#">                  </a>
                    </li>
                    {
                        this.state.isAuthenticated?
                    <li className="nav-item">
                    <a className="navbar-brand" href="/profile">@{this.state.user}</a>
                    </li>
                        :""
                    }
                </ul>

                <ul class="navbar-nav navbar-right please">
                {this.state.isAuthenticated?
                <span>

                    <li className="nav-item please2 text-nowrap">
                    <a className="nav-link" onClick={this.clickLogout} href="#">Logout</a>
                    </li>
                    <li className="nav-item please2 fresh-start">
                    <a className="nav-link" onClick={this.clickreset} href="#">Fresh-Start</a>
                    </li>
                </span>
                :
                <span>

                <li className="nav-item please2 text-nowrap">
                    <a className="nav-link" href="/login">Login</a>
                </li>
                <li className="nav-item please2 text-nowrap">
                    <a className="nav-link" href="/signup">SignUp</a>
                </li>
                </span>
                }
                </ul>
                </nav>
                <div className="my-content">
                {
                    this.state.isAuthenticated?
                <div class="sidenav">
                    <div className="sidebar-header">
                        <a href="/tasks/all">
                        All Tasks
                        </a>
                    </div>
                    <a href="/addtask">+Add Task</a>
                    <a href={`/tasks/Personal`}>Personal</a>
                    <a href={`/tasks/Work`}>Work</a>
                    <a href={`/tasks/Shopping`}>Shopping</a>
                    <a href={`/tasks/Others`}>Others</a>
                    <a href={`/tasks/overdue`}>OverDue</a>
                    <div className="sidebar-header">
                    <a href={`/tasks/archived`}>Archived</a>
                    </div>
                    <a href={`/jointeam`}>Join Team</a>
                    <a href="/createteam">+ Team</a>
                    <div className="sidebar-header">
                        Teams
                    </div>
                    {teamlist}
                    <a href="#"></a>
                    <br />
                    <br />
                    <a href="#"></a>
                </div>
                    :
                    <Home />
                }
                
                <div className="app-header">
                   {this.props.children}
                   
                </div>
                 </div>
            </div>
        );
    }
}

export default  withRouter(Layout);  