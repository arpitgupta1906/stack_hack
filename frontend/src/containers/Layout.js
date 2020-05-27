import React, { Component } from 'react';
import './Layout.css';


class Layout extends Component {

    constructor(props) {
        super(props);
        this.state={
            isAuthenticated: true
        }

        console.log(this.state.isAuthenticated)
    }
    


    render() {

        return (
            <div>
                <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                    <a className="navbar-brand" href="#">Active</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="#">Link</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="#">Link</a>
                    </li>
                    <li className="nav-item ">
                    <a className="nav-link disabled" href="#">Disabled</a>
                    </li>
                </ul>

                <ul class="navbar-nav navbar-right please">
                    <li className="nav-item please text-nowrap">
                    <a className="nav-link" href="#">Logout</a>
                    </li>
                </ul>
                </nav>
                <div className="my-content">
                {
                    this.state.isAuthenticated?
                <div class="sidenav">
                    <div className="sidebar-header">
                        All Tasks
                    </div>
                    <a href="#">+Add Task</a>
                    <a href="#">Personal</a>
                    <a href="#">Work</a>
                    <a href="#">Shopping</a>
                    <a href="#">Others</a>
                    <div className="sidebar-header">
                    <a href="#">Archived</a>
                    </div>
                    <a href="#">Join Team</a>
                    <a href="#">+ Team</a>
                    <div className="sidebar-header">
                        Teams
                    </div>
                    <a href="#">Team1</a>
                    <a href="#">Team2</a>
                    <a href="#">Team1</a>
                    <a href="#">Team1</a>
                    <a href="#">Team1</a>
                    <a href="#">Team1</a>
                    <a href="#">Team1</a>
                </div>
                    :
                    ""
                }
                
                <div className="app-header">
                   {this.props.children}
                   
                </div>
                 </div>
            </div>
        );
    }
}

export default Layout;  