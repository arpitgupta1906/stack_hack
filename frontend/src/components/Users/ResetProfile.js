import React, { Component } from 'react';
import '../css/Login.css'

class ResetProfile extends Component {

    constructor(props) {
        super(props);
        this.state={
            check: false
        }
    }
    

handleSubmit=(event)=>{
    const email=event.target.email.value;
    this.setStat={
        check: true
    }

handleOtp=(event)=>{
    const code=event.target.code.value;
    console.log(code);
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
        <button type="submit" class="btn btn-primary">SignUp</button>

        </form>
        {
            this.state.check?
            <div>
            <label for="code">Code:</label>
            <input placeholder="Enter OTP" id="code" />
            <button type="submit" onClick={this.handleOtp} class="btn btn-primary">Verify</button>
            </div>
            :""
        }
            </div>
        );
    }
}

export default ResetProfile;