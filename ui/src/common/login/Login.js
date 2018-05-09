import React, { Component } from 'react';
import '../../style.css';

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {username:'',password:''};
        this.login = this.login.bind(this);
        this.username = this.username.bind(this);
        this.password = this.password.bind(this);
    }

    username(e){
        this.setState({ username: e.target.value });
    }
    password(e){
        this.setState({ password: e.target.value });
    }
    login(e){
        console.log(this.state.username);
        this.props.history.push("/register")
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
                   
                    <button className="btn btn-primary" onClick={this.login}>Login</button>
               
            </div>
          )
    }
}
export default Login;
