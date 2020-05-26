import React, { Component } from 'react';
import '../css/Login.css'

class Login extends Component {

    handleSubmit=(event)=>{
        event.preventDefault();
        const password=event.target.elements.password.value;
        const email=event.target.elements.email.value;
        console.log(email)

        // axios.post('http://localhost:8080/users/login/',{
        //     email: email,
        //     password: password
        // }).then(res=>{
        //     // console.log(res.data.token)
        //     localStorage.setItem('token',res.data.token)
        //     localStorage.setItem('user',JSON.stringify(res.data.user))
        //     this.props.history.push('/')
        //     // console.log(localStorage.getItem('token'))
        // })
        // .catch(error=>console.error(error));

        
    }

    render() {
        return (
            <div className='login'>
                 <form onSubmit={this.handleSubmit}>
            <div class="form-group">
                <label for="email">Email address:</label>
                <input name='email' type="email" class="form-control" placeholder="Enter email" id="email" />
            </div>
            <div class="form-group">
                <label for="pwd">Password:</label>
                <input name='password' type="password" class="form-control" placeholder="Enter password" id="pwd" />
            </div>
            <div className="form-group">
            <a href="#"> Sign Up?</a>
            <a href="#"> Forgot Password?</a>
            </div>
            
            <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            </div>
        );
    }
}

export default Login;