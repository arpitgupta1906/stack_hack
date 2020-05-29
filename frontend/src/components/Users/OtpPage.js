import React, { Component } from 'react';
import '../css/Login.css'
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class ResetProfile extends Component {
    
    handleSubmit=async (event)=>{
        event.preventDefault();
        const _ID=this.props.match.params.ID;
        const password=event.target.password.value;
        const code=event.target.code.value;
       
        try{

            const user=await axios.post(`http://localhost:3000/resetcode/${_ID}`,{
                resetcode:code,
                password
            })
            this.props.push('/login')
        }
        catch(e){
            console.log(e)
        }
    }


    render() {
        return (
            <div className='login fitting'>
        <form onSubmit={this.handleSubmit}>
        <div className="form-group">
            <label for="code">Otp Code:</label>
            <input name="code" placeholder="Enter OTP" id="code" />
        </div>
        <div class="form-group">
                <label for="pwd">New Password:</label>
                <input name='password' type="password" class="form-control" placeholder="Enter password" id="pwd" />
        </div>
        <button type="submit" class="btn btn-primary">Reset</button>

        </form>
        
        </div>
        );
    }
}

export default withRouter(ResetProfile);