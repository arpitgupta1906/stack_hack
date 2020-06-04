import React, { Component } from 'react';
import '../css/Login.css'
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import '../css/AddTask.css';

class ResetProfile extends Component {
    
    constructor(props) {
        super(props);
        this.state={
            error:""
        }
    }
    

    handleSubmit=async (event)=>{
        event.preventDefault();
        const _ID=this.props.match.params.ID;
        const password=event.target.password.value;
        const code=event.target.code.value;
       
        try{

            const user=await axios.post(`https://hashlist.herokuapp.com/resetcode/${_ID}`,{
                resetcode:code,
                password
            })
            this.props.push('/login')
        }
        catch(e){
            this.setState({
                error:"Invalid OTP code"
            })
            // console.log(e)
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
        <button type="submit" class="btn btn-primary join">Reset</button>

        </form>
        {this.state.error? 
                <span className="error"> 
                {this.state.error}
                </span>
                :""
                }
        </div>
        );
    }
}

export default withRouter(ResetProfile);