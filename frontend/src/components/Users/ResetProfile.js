import React, { Component } from 'react';
import '../css/Login.css'
import axios from 'axios';

class ResetProfile extends Component {

    constructor(props) {
        super(props);
        this.state={
            check: false
        }
    }
    

    handleSubmit=async (event)=>{
        event.preventDefault();
        const email=event.target.email.value;
        console.log(email)
        try{

            const user=await axios.patch('http://localhost:3000/resetpassword',{
                email
            })
            if(user){
                // this.props.history.push(`/${user._id}`)
                // console.log(user);
            }
            else{
                console.log('error')
            }
        }
        catch(e){
            console.log(e)
        }
    }

    render() {
        return (
            <div className='login'>
        <form onSubmit={this.handleSubmit}>

        <div class="form-group">
            <label for="email">Email address:</label>
            <input type="email"  class="form-control" placeholder="Enter email" id="email" />
        </div>
        <button type="submit" class="btn btn-primary">Verify</button>

        </form>
        {/* {
            this.state.check?
            <div>
            <label for="code">Code:</label>
            <input placeholder="Enter OTP" id="code" />
            <button type="submit" onClick={this.handleOtp} class="btn btn-primary">Reset</button>
            </div>
            :""
        } */}
            </div>
        );
    }
}

export default ResetProfile;