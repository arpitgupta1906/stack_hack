import React, { Component } from 'react';
import '../css/Login.css'
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import '../css/AddTask.css';

class ResetProfile extends Component {

    constructor(props) {
        super(props);
        this.state={
            check: false,
            error:""
        }
    }
    

    handleSubmit=async (event)=>{
        event.preventDefault();
        const email=event.target.email.value;
        
        try{

            const res=await axios.patch('http://localhost:3000/resetpassword',{
                email
            })
            if(res.data._id){
                this.props.history.push(`/resetpassword/${res.data._id}`)
                // console.log(res.data._id);
            }
            else{
                this.setState({
                    error:"Account does not exist"
                })
                // console.log('error')
            }
        }
        catch(e){
            this.setState({
                error:"Account does not exist"
            })
        }
    }

    render() {
        return (
            <div className='login fitting'>
        <form onSubmit={this.handleSubmit}>
            <h4>OTP will be sent to your email</h4>
            <br />
        <div class="form-group">
            <label for="email">Email address:</label>
            <input type="email"  class="form-control" placeholder="Enter email" id="email" />
        </div>
        <button type="submit" class="btn btn-primary">Verify</button>

        </form>
        <br />
        <a className="pointers join" href="/signup">Signup?</a>
        <a className="pointers join" href="/login">Login</a>
        {/* {
            this.state.check?
            <div>
            <label for="code">Code:</label>
            <input placeholder="Enter OTP" id="code" />
            <button type="submit" onClick={this.handleOtp} class="btn btn-primary">Reset</button>
            </div>
            :""
        } */}
        <p>

        {this.state.error? 
        <span className="error"> 
        {this.state.error}
        </span>
        :""
        }
        </p>
            </div>
        );
    }
}

export default withRouter(ResetProfile);