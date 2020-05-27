import React, { Component } from 'react';
import '../css/Login.css'
import axios from 'axios';

class ResetProfile extends Component {
    
    handleSubmit=async (event)=>{
        event.preventDefault();
        const _ID=this.props.match.params.ID;
        const password=event.target.email.value;
        const code=event.target.code.value;
        console.log(email)
        try{

            const user=await axios.post(`http://localhost:3000/resetcode/${_ID}`,{
                resetcode:code,
                password
            })
            // this.props.push('/')
        }
        catch(e){
            console.log(e)
        }
    }


    render() {
        return (
            <div className='login'>
        <form onSubmit={this.handleSubmit}>
        <div className="form-group">
            <label for="code">Code:</label>
            <input name="code" placeholder="Enter OTP" id="code" />
        </div>
        <div class="form-group">
                <label for="pwd">Password:</label>
                <input name='password' type="password" class="form-control" placeholder="Enter password" id="pwd" />
        </div>
        <button type="submit" class="btn btn-primary">Reset</button>

        </form>
        
        </div>
        );
    }
}

export default ResetProfile;