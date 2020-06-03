import React, { Component } from 'react';
import '../css/Login.css'
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state={
            
                email: '',
                name: "",
                password: "",
                errors:{
                    name:"",
                    email:"",
                    password:"",
                }
        }
    }

    handleSubmit=(event)=>{
        event.preventDefault();
        const password=event.target.elements.pwd.value;
        const password2=event.target.elements.pwd2.value;
        const email=event.target.email.value;
        const name=event.target.name.value;
        
        console.log(email)

        if(this.validateForm(this.state.errors) && password===password2 && password.length>6){
            
            axios.post('/users/signup',{
                email,
                password,
                name
            }).then((res)=>{
                localStorage.setItem('token',res.data.token)
                localStorage.setItem('user',JSON.stringify(res.data.user))
                this.props.history.push('/tasks/all');
                window.location.reload()
                // console.log(res.data)
            })
        }
        else{
            let errors=this.state.errors;
            errors.password='The two passwords do not match';
            this.setState({
                errors
            });
            console.log('Invalid form')
        }
    }


    validateForm=(errors)=>{
        let valid=true;
        Object.values(errors).forEach(
            (val)=>val.length>0 && (valid=false)
        );
        return valid;
    }

    handleChange=(event)=>{
        event.preventDefault();
        let {name,value}=event.target;
        let errors=this.state.errors;

        switch(name){
            case 'name':
                errors.name=value.length<3?'Full Name must be atleast 3 Characters':"";
                break;
            default:
                break;
        }
        this.setState({errors,[name]:value},()=>{
            // console.log(errors);
        })
    }


    render() {
        let errors=this.state;
    return (
    <div className='login fitting'>
        <form onSubmit={this.handleSubmit}>
        <div class="form-group">
            <label for="name">Username:</label>
            <input type="name" onChange={this.handleChange} class="form-control" placeholder="Enter Username" id="name" />
            {this.state.name.length>0 && <span className='error'>{errors.name}</span>}
        </div>

        <div class="form-group">
            <label for="email">Email address:</label>
            <input type="email" onChange={this.handleChange} class="form-control" placeholder="Enter email" id="email" />
            {this.state.email.length>0 && <span className='error'>{errors.email}</span>}
        </div>

        <div class="form-group">
            <label for="pwd">Password:</label>
            <input type="password" onChange={this.handleChange} class="form-control" placeholder="Enter password" id="pwd" />
        </div>
        <div class="form-group">
            <label for="pwd2">Confirm Password:</label>
            <input type="password" onChange={this.handleChange} class="form-control" placeholder="Enter password again" id="pwd2" />
            {<span className='error'>{errors.password}</span>}
        </div>
        <button type="submit" class="btn btn-primary">SignUp</button>
        </form>
        <a className="pointers" href="/login"> Login?</a>

    </div>
    );
    }
}

export default withRouter(SignUp);