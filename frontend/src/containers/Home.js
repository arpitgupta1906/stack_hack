import React, { Component } from 'react';
import '../components/css/Home.css';

class Home extends Component {
    render() {
        return (
            <div className="home-main">
                <h1 className="home-header">ToDoIst</h1>
                <p className="home-p">Do more, Be more.</p>
                {/* <p>
                <div id="frm">

                <button className="btn btn-primary home-button"><a  href="/login">Login</a></button>
                <button className="btn btn-primary home-button"><a href="/signup">Signup</a></button>
                </div>
                </p> */}
                <div id="outer">
  <div class="inner"><button className="btn btn-primary home-button"><a  href="/login">Login</a></button></div>
  <div class="inner"><button className="btn btn-primary home-button"><a href="/signup">Signup</a></button></div>
  
</div>
            </div>
        );
    }
}

export default Home;