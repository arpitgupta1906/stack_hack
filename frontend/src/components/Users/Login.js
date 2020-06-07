import React, { Component } from 'react';
import '../css/Login.css'
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class Login extends Component {

    handleSubmit=(event)=>{
        event.preventDefault();
        const password=event.target.elements.password.value;
        const email=event.target.elements.email.value;
        console.log(email)

        axios.post('https://hashlist.herokuapp.com/users/login/',{
            email: email,
            password: password
        }).then(res=>{
            // console.log(res.data.token)
            // console.log(res.data.user)
            localStorage.setItem('token',res.data.token)
            localStorage.setItem('user',JSON.stringify(res.data.user))
            this.props.history.push('/tasks')
            window.location.reload()
            // console.log(localStorage.getItem('token'))
        })
        .catch((error)=>{
            alert('Wrong Password or username')
            console.error(error)
        });

        
    }

    render() {
        return (
            <div className='login fitting better-ui'>
                 <form onSubmit={this.handleSubmit}>
            <div class="form-group">
                <label for="email">Email address:</label>
                <input name='email' type="email" class="form-control" placeholder="Enter email" id="email" />
            </div>
            <div class="form-group">
                <label for="pwd">Password:</label>
                <input name='password' type="password" class="form-control" placeholder="Enter password" id="pwd" />
            <button type="submit" class="btn btn-primary">Submit</button>
            </div>
            </form>
            {/* <br />  */}
            {/* <div className="form-group"> */}
            <a className="pointers" href="/signup"> Sign Up?</a>
            <a className="pointers" href="/forgotpassword"> Forgot Password?</a>
            {/* </div> */}
            
            </div>
        );
    }
}

export default withRouter(Login);