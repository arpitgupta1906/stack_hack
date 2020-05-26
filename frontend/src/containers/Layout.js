import React, { Component } from 'react';
import './Layout.css';


class Layout extends Component {

    constructor(props) {
        super(props);
        this.state={
            isAuthenticated: false
        }

        console.log(this.state.isAuthenticated)
    }
    


    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-sm bg-light fixed-top">
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
                    <li className="nav-item">
                    <a className="nav-link disabled" href="#">Disabled</a>
                    </li>
                </ul>

                <ul class="navbar-nav navbar-right">
                    <li className="nav-item text-nowrap">
                    <a className="nav-link" href="#">Logout</a>
                    </li>
                </ul>
                </nav>
                <div className="my-content">
                {
                    this.state.isAuthenticated?
                <div class="sidenav">
                    <div className="sidebar-header">
                        Main
                    </div>
                    <a href="#">About</a>
                    <a href="#">Services</a>
                    <a href="#">Clients</a>
                    <a href="#">Contact</a>
                </div>
                    :
                    ""
                }
                
                <div className="app-header">
                   {this.props.children}
                    <p> HI I am alright I guess keep typing keep typing
                    </p>
                </div>
                 </div>
            </div>
        );
    }
}

export default Layout;  