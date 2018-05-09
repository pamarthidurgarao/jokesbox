import React, { Component } from 'react';
import '../../style.css';

class Register extends Component {

    constructor(props){
        super(props);
        this.state = {username:'',password:''};
        this.signup = this.signup.bind(this);
        this.username = this.username.bind(this);
        this.password = this.password.bind(this);
    }

    username(e){
        this.setState({ username: e.target.value });
    }
    password(e){
        this.setState({ password: e.target.value });
    }
    signup(e){
        console.log(this.state.username);
        this.props.history.push("/login")
    }

    render() {
        return (
            <div className="p-1">
                
                    <div className="form-group col-sm-4">
                        <label >Email address</label>
                        <input type="email" className="form-control" value={this.state.username} onChange={ this.username } placeholder="Enter email"/>
                    </div>
                    <div className="form-group col-sm-4">
                    <label >Password</label>
                        <input type="password" className="form-control" value={this.state.password} onChange={ this.password } placeholder="Password"/>
                    </div>
                    <div className="form-group col-sm-4">
                    <label >Re-Password</label>
                        <input type="password" className="form-control" value={this.state.password} onChange={ this.password } placeholder="Re enter password"/>
                    </div>
                   
                    <button className="btn btn-primary" onClick={this.signup}>Sign up</button>
               
            </div>
          )
    }
}
export default Register;
